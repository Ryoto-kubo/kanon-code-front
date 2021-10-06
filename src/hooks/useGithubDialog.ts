import { errorMessages } from '@/consts/error-messages';
import { ResponseGithubSourceTreeTypes } from '@/types/api/get-github-source-tree';
import { GithubSourceTreeTypes } from '@/types/global';
import { GithubBranchesTypes, GithubReposTypes } from '@/types/global/index';
import { getGithubEncodeContent } from '@/utils/api/get-github-encode-content';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

type TreeTypes = {
  [key: string]: {
    tree: GithubSourceTreeTypes[];
    contents: {
      [key: string]: string;
    };
  };
};

export const useGithubDialog = (
  repos: GithubReposTypes[],
  getBranches: (repository: string) => Promise<void>,
  getSourceTreeByBranch: (
    repository: string,
    branch: string
  ) => Promise<AxiosResponse<ResponseGithubSourceTreeTypes>>,
  insertToInputFileNameLists: (
    choosedFullPathList: string[],
    encodeContents: {
      [key: string]: string;
    }
  ) => void
) => {
  const [choosedRepository, setChoosedRepository] = useState('');
  const [choosedBranch, setChoosedBranch] = useState('');
  const [choosedFullPathList, setChoosedFullPathList] = useState<string[]>([]);
  const [currentSelectedPath, setCurrentSelectedPath] = useState('');
  const [isChoosedRepository, setIsChoosedRepository] = useState(true);
  const [isChoosedBranch, setIsChoosedBranch] = useState(true);
  const [isChoosedFullPath, setIsChoosedFullPath] = useState(true);
  const [isFetchBranch, setIsFetchBranch] = useState(false);
  const [isFetchTree, setIsFetchTree] = useState(false);
  const [isFetchContent, setIsFetchContent] = useState(false);
  const [treeObject, setTreeObject] = useState<TreeTypes>({});
  const [decodedContent, setDecodedContent] = useState('');

  const getChoosedRepositoryBranches = (repositoryName: string) => {
    const repository = repos.filter(el => el.fullName === repositoryName);
    if (repository.length <= 0) return [];
    return repository[0].branches;
  };

  const getBranchesBySelectedRepo = async (
    _: React.ChangeEvent<{}>,
    githubRepos: GithubReposTypes | null
  ) => {
    if (githubRepos === null) {
      setChoosedRepository('');
      return;
    }
    const currentRepoFullName = githubRepos!.fullName;
    // 同じリポジトリを選択した場合は、returnする
    if (currentRepoFullName === choosedRepository) return;
    setChoosedBranch('');
    setIsChoosedRepository(true);
    setChoosedRepository(currentRepoFullName);
    setChoosedFullPathList([]);
    setDecodedContent('');
    const branches = getChoosedRepositoryBranches(currentRepoFullName);
    // 選択したリポジトリにブランチが存在する場合は、過去に選択されたリポジトリなので、apiを叩かない
    if (branches.length > 0) return;
    setIsFetchBranch(true);
    await getBranches(currentRepoFullName);
    setIsFetchBranch(false);
  };

  const selectBranch = (
    _: React.ChangeEvent<{}>,
    value: GithubBranchesTypes | null
  ) => {
    if (value === null) {
      setChoosedBranch('');
      return;
    }
    const branch = value!.name;
    setIsChoosedBranch(true);
    setChoosedBranch(branch);
  };

  const decodeContent = (name: string, encodeContent: string) => {
    const lang = name.split('.').pop();
    const decodeContent = window.atob(encodeContent);
    const bedginMd = `\`\`\`${lang}\n`;
    const endMd = '\n```';
    const mdContent = `${bedginMd}${decodeContent}${endMd}`;
    setDecodedContent(mdContent.replace(/ /g, '\u00A0'));
  };

  const validSelectedRepositoryAndBranch = () => {
    setIsChoosedRepository(choosedRepository !== '');
    setIsChoosedBranch(choosedBranch !== '');
    return choosedRepository !== '' && choosedBranch !== '';
  };

  const validChoosedFullPath = () => {
    const isValid = choosedFullPathList.length > 0;
    setIsChoosedFullPath(isValid);
    return isValid;
  };

  const getTree = async () => {
    const isValid = validSelectedRepositoryAndBranch();
    if (!isValid) return;
    const key = `${choosedRepository}#${choosedBranch}`;
    // すでにtreeを取得ずみのrepository & branchの組み合わせはreturnしておく
    if (treeObject[key] !== undefined) return;
    setIsFetchTree(true);
    try {
      const result = await getSourceTreeByBranch(
        choosedRepository,
        choosedBranch
      );
      const tree = result.data.tree.children!;
      setTreeObject({
        ...treeObject,
        [key]: {
          tree: tree,
          contents: {},
        },
      });
      setIsFetchTree(false);
    } catch (error) {
      console.error(error);
      alert(errorMessages.SYSTEM_ERROR);
      setIsFetchTree(false);
    }
  };

  const getContent = async (name: string, sha: string, path: string) => {
    const key = getKeyForTree();
    const isValid = validSelectedRepositoryAndBranch();
    if (!isValid) return;
    if (sha === undefined) return;
    const savedEncodeContent = treeObject[key].contents[path];
    if (savedEncodeContent !== undefined) {
      // 一度取得したコードはstateに持たせる
      decodeContent(name, savedEncodeContent);
      insertPathTochoosedFullPathListIfNeeded(path);
      changeDisplaySourceCode(path);
      return;
    }
    const repository = choosedRepository;
    const newContents = treeObject[key].contents;
    setIsFetchContent(true);
    setChoosedFullPathList([...choosedFullPathList, path]);
    try {
      const result = await getGithubEncodeContent({ repository, sha });
      const encodeContent = result.data.content;
      decodeContent(name, encodeContent);
      newContents[path] = encodeContent;
      setTreeObject({
        ...treeObject,
        [key]: {
          tree: treeObject[key].tree,
          contents: newContents,
        },
      });
      setIsChoosedFullPath(true);
      setCurrentSelectedPath(path);
      changeDisplaySourceCode(path);
      setIsFetchContent(false);
    } catch (error) {
      console.error(error);
      alert(errorMessages.SYSTEM_ERROR);
      setIsFetchContent(false);
    }
  };

  const getKeyForTree = () => {
    return `${choosedRepository}#${choosedBranch}`;
  };

  const insertPathTochoosedFullPathListIfNeeded = (path: string) => {
    const newChoosedFullPathList = choosedFullPathList.filter(
      el => el === path
    );
    if (newChoosedFullPathList.length <= 0) {
      setCurrentSelectedPath(path);
      setChoosedFullPathList([...choosedFullPathList, path]);
    }
  };

  const deleteSelctedSourceCode = (path: string) => {
    const newChoosedFullPathList = choosedFullPathList.filter(
      el => el !== path
    );
    setChoosedFullPathList(newChoosedFullPathList);
    const lastLength = newChoosedFullPathList.length;
    const shouldDisplaySourceCodePath = newChoosedFullPathList[lastLength - 1];
    if (shouldDisplaySourceCodePath !== undefined) {
      changeDisplaySourceCode(shouldDisplaySourceCodePath);
    } else {
      setDecodedContent('');
    }
  };

  const changeDisplaySourceCode = (path: string) => {
    const key = getKeyForTree();
    const encodeContent = treeObject[key].contents[path];
    if (encodeContent === undefined) return;
    setCurrentSelectedPath(path);
    decodeContent(path, encodeContent);
  };

  const applySourceCode = () => {
    const isValid = validSelectedRepositoryAndBranch();
    if (!isValid) return;
    const isValidChoosedFullPath = validChoosedFullPath();
    if (!isValidChoosedFullPath) return;
    if (isFetchContent) return;
    const key = getKeyForTree();
    insertToInputFileNameLists(choosedFullPathList, treeObject[key].contents);
  };

  return {
    choosedRepository,
    choosedFullPathList,
    isChoosedRepository,
    isChoosedBranch,
    isChoosedFullPath,
    isFetchBranch,
    isFetchTree,
    isFetchContent,
    treeObject,
    decodedContent,
    currentSelectedPath,
    getBranchesBySelectedRepo,
    getChoosedRepositoryBranches,
    selectBranch,
    getTree,
    getContent,
    getKeyForTree,
    changeDisplaySourceCode,
    deleteSelctedSourceCode,
    applySourceCode,
  };
};
