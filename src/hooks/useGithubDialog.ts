import { errorMessages } from '@/consts/error-messages';
import { ResponseGithubSourceTreeTypes } from '@/types/api/get-github-source-tree';
import { SourceTreeTypes } from '@/types/global';
import { GithubBranchesTypes, GithubReposTypes } from '@/types/global/index';
import { getGithubEncodeContent } from '@/utils/api/get-github-encode-content';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

type TreeTypes = {
  [key: string]: SourceTreeTypes[];
};
export const useGithubDialog = (
  repos: GithubReposTypes[],
  getBranches: (repository: string) => Promise<void>,
  getSourceTreeByBranch: (
    repository: string,
    branch: string
  ) => Promise<AxiosResponse<ResponseGithubSourceTreeTypes>>
) => {
  const [choosedRepository, setChoosedRepository] = useState('');
  const [choosedBranch, setChoosedBranch] = useState('');
  const [isBranchFetch, setIsBranchFetch] = useState(false);
  const [treeObject, setTreeObject] = useState<TreeTypes>({});
  const [decodedContent, setDecodedContent] = useState('');
  // const [decodedContent, setDecodedContent] = useState<string[]>([]);

  const choosedRepositoryBranches = (repositoryName: string) => {
    const repository = repos.filter(el => el.fullName === repositoryName);
    if (repository.length <= 0) return [];
    return repository[0].branches;
  };

  const getBranchesBySelectedRepo = async (
    _: React.ChangeEvent<{}>,
    githubRepos: GithubReposTypes | null
  ) => {
    const currentRepoFullName = githubRepos!.fullName;
    // 同じリポジトリを選択した場合は、returnする
    if (currentRepoFullName === choosedRepository) return;
    setChoosedRepository(currentRepoFullName);
    const branches = choosedRepositoryBranches(currentRepoFullName);
    // ブランチが存在する場合は、過去に選択されたリポジトリなので、apiを叩かなくて良い
    if (branches.length > 0) return;
    setIsBranchFetch(true);
    await getBranches(currentRepoFullName);
    setIsBranchFetch(false);
  };

  const selectBranch = (
    _: React.ChangeEvent<{}>,
    value: GithubBranchesTypes | null
  ) => {
    const branch = value!.name;
    setChoosedBranch(branch);
  };

  const decodeContent = (name: string, encodeContent: string) => {
    const lang = name.split('.').pop();
    const decodeContent = window.atob(encodeContent);
    const bedginMd = `\`\`\`\`${lang}\n`;
    const mdContent = `${bedginMd}${decodeContent}`;
    setDecodedContent(mdContent.replace(/ /g, '\u00A0'));
  };

  const validSelectedRepositoryAndBranch = () => {
    return choosedRepository !== '' && choosedBranch !== '';
  };

  const getTree = async () => {
    const isValid = validSelectedRepositoryAndBranch();
    if (!isValid) return;
    const key = `${choosedRepository}#${choosedBranch}`;
    // すでにtreeを取得ずみのrepository & branchの組み合わせはreturnしておく
    if (treeObject[key] !== undefined) return;
    try {
      const result = await getSourceTreeByBranch(
        choosedRepository,
        choosedBranch
      );
      const tree = result.data.tree.children!;
      setTreeObject({ ...treeObject, [key]: tree });
    } catch (error) {
      console.error(error);
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  const getContent = async (name: string, sha: string) => {
    const repository = choosedRepository;
    try {
      const result = await getGithubEncodeContent({ repository, sha });
      const encodeContent = result.data.content;
      decodeContent(name, encodeContent);
    } catch (error) {
      console.error(error);
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  return {
    choosedRepository,
    choosedBranch,
    isBranchFetch,
    treeObject,
    decodedContent,
    getBranchesBySelectedRepo,
    choosedRepositoryBranches,
    selectBranch,
    getTree,
    getContent,
  };
};