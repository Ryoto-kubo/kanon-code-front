import * as CONSTS from '@/consts/const';
import { errorMessages, validMessages } from '@/consts/error-messages';
import { ProgrammingIcon } from '@/types/global';
import { getContent } from '@/utils/api/get-content';
import { getGithubBranches } from '@/utils/api/get-github-branches';
import { getGithubRepos } from '@/utils/api/get-github-repos';
import { getGithubSourceTree } from '@/utils/api/get-github-source-tree';
import { putContent } from '@/utils/api/put-content';
import { PrepareContentBeforePost } from '@/utils/prepare-content-before-post';
import { Validation } from '@/utils/validation';
import marked from 'marked';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GithubReposTypes } from './../types/global/index';
import { getGithubAccessToken } from './../utils/api/get-github-oauth';

type FileNameType = {
  key: string;
  fileName: string;
  sourceCode: string;
  bodyHtml: string;
  isValid: boolean;
  isAuto?: boolean;
};

type ButtonText = Readonly<
  '投稿設定' | '編集設定' | '下書き保存' | '保存中...' | '保存済み ✔︎'
>;

type ValidObject = {
  isValid: boolean;
  message: string;
};

const getAuthorId = (partitionKey: string) => {
  const userIdIndex = 1;
  return partitionKey.split('#')[userIdIndex];
};

const createValidObject = (defaultValue: boolean, defaultMessage: string) => {
  return {
    isValid: defaultValue,
    message: defaultMessage,
  };
};

export const useEditPost = (postId: string) => {
  const router = useRouter();

  const [authorId, setAurhorId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<'post_published' | 'post_draft' | ''>('');
  const [buttonText, setButtonText] = useState<ButtonText>(
    type === 'post_published' ? '編集設定' : '下書き保存'
  );
  const [keys, setKeys] = useState<{
    partition_key: string;
    sort_key: string;
  }>({
    partition_key: '',
    sort_key: '',
  });
  const [title, setTitle] = useState('');
  const [isSuccessed, setIsSuccessed] = useState(false);
  // const [tagList, setTagList] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [sourceCode, setSourceCode] = useState('```\n\n```');
  const [inputFileNameLists, setInputFileNameLists] = useState([
    {
      key: uuidv4(),
      fileName: '',
      sourceCode: '```\n\n```',
      bodyHtml: '',
      isValid: true,
      isAuto: false,
    },
  ]);
  const [targetLanguageValue, setTargetLanguageValue] = useState(0);
  const [budget, setBudget] = useState(0);
  const [programmingIcon, setProgrammingIcon] = useState<ProgrammingIcon>({
    id: 0,
    value: '',
    iconPath: '',
    ogpPath: '',
  });
  const [isValidTitleObject, setIsValidTitleObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_TITLE)
  );
  const [isValidTagsObject, setIsValidTagsObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_TAGS)
  );
  const [
    isValidDescriptionObject,
    setIsValidDescriptionObject,
  ] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_DESCRIPTION)
  );
  const [
    isValidFileNameObject,
    setIsValidFileNameObject,
  ] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_FILE_NAME)
  );
  const [
    isValidSourceCodeObject,
    setIsValidSourceCodeObject,
  ] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_SOURCE_CODE)
  );
  const [isValidBudget, setIsValidBudget] = useState<ValidObject>(
    createValidObject(false, validMessages.ZERO_UNDER_OVER_MAX_PRICE)
  );
  const [isPosted, setIsPosted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenTreeDialog, setIsOpenTreeDialog] = useState(false);
  const [isOpenGithubDialog, setIsOpenGithubDialog] = useState(false);
  const [canPublish, setCanPublish] = useState<ValidObject>(
    createValidObject(true, '')
  );
  const [hasGithubAccessToken, setHasGithubAccessToken] = useState(false);
  const [isFetchGithubData, setIsFetchGithubData] = useState(true);
  const [repos, setRepos] = useState<GithubReposTypes[] | []>([]);

  useEffect(() => {
    (async () => {
      try {
        const resultAccessToken = await getGithubAccessToken();
        const accessToken = resultAccessToken.data.access_token;
        const hasAccessToken = accessToken !== undefined && accessToken !== '';
        setHasGithubAccessToken(hasAccessToken);
        const result = await getContent({ postId });
        const post = result.data.post;
        setAurhorId(getAuthorId(post.partition_key));
        setKeys({
          ...keys,
          partition_key: post.partition_key,
          sort_key: post.sort_key,
        });
        setType(post.type);
        setButtonText(
          post.type === 'post_published' ? '編集設定' : '下書き保存'
        );
        setTitle(post.contents.title);
        // setTagList(post.contents.tagList);
        setDescription(post.contents.description.value);
        setSourceCode(post.contents.inputFileNameLists[0].sourceCode);
        setInputFileNameLists(post.contents.inputFileNameLists);
        setTargetLanguageValue(post.contents.targetLanguage);
        setBudget(post.contents.budget);
        setProgrammingIcon(post.contents.targetIcon);
        setIsValidTitleObject({
          ...isValidTitleObject,
          isValid: post.contents.title !== '',
          message:
            post.contents.title !== '' ? '' : validMessages.REQUIRED_TITLE,
        });
        setIsValidTagsObject({
          ...isValidTagsObject,
          isValid: post.contents.tagList.length > 0,
          message:
            post.contents.tagList.length > 0
              ? ''
              : validMessages.REQUIRED_TITLE,
        });
        setIsValidDescriptionObject({
          ...isValidDescriptionObject,
          isValid: post.contents.title !== '',
          message:
            post.contents.title !== ''
              ? ''
              : validMessages.REQUIRED_DESCRIPTION,
        });
        setIsValidFileNameObject({
          ...isValidFileNameObject,
          isValid: post.contents.inputFileNameLists[0].fileName !== '',
          message:
            post.contents.inputFileNameLists[0].fileName !== ''
              ? ''
              : validMessages.REQUIRED_FILE_NAME,
        });
        setIsValidSourceCodeObject({
          ...isValidSourceCodeObject,
          isValid: post.contents.inputFileNameLists[0].sourceCode !== '',
          message:
            post.contents.inputFileNameLists[0].sourceCode !== ''
              ? ''
              : validMessages.REQUIRED_SOURCE_CODE,
        });
        setIsValidBudget({
          ...isValidBudget,
          isValid: post.contents.budget > 0,
          message:
            post.contents.budget > 0
              ? ''
              : validMessages.ZERO_UNDER_OVER_MAX_PRICE,
        });

        setIsLoading(false);
      } catch (error) {
        alert(errorMessages.SYSTEM_ERROR);
      }
    })();
  }, []);

  const execPreviousPageIfneeded = (isValidExistData: boolean) => {
    if (isValidExistData && !isPosted) {
      if (confirm('データが入力されています。保存せずに終了しますか？')) {
        history.back();
      }
    } else if (isValidExistData && isPosted) {
      history.back();
    } else if (!isValidExistData) {
      history.back();
    }
  };

  const previousPage = useCallback(() => {
    // データが存在していて下書き保存されていなければ表示させる
    const isValidExistData = validExistData();
    execPreviousPageIfneeded(isValidExistData);
  }, [title, description, inputFileNameLists, isPosted]);
  // }, [title, tagList, description, inputFileNameLists, isPosted]);
  const closeSnackBar = () => {
    setCanPublish({
      ...canPublish,
      isValid: true,
    });
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const createParams = (key: string) => {
    return {
      partitionKey: keys.partition_key,
      sortKey: keys.sort_key,
      postType: key,
      contents: {
        title: title,
        tagList: [],
        // tagList: tagList,
        description: {
          value: description,
          bodyHtml: marked(description),
        },
        inputFileNameLists: inputFileNameLists,
        targetLanguage: targetLanguageValue,
        targetIcon: programmingIcon,
        budget: budget,
      },
    };
  };

  const initCanPublish = () => {
    setCanPublish({
      ...canPublish,
      isValid: true,
    });
  };

  const validExistData = useCallback(() => {
    const isExistTitle = isValidTitleObject.isValid;
    // const isExistTagList = isValidTagsObject.isValid;
    const isExistDescription = isValidDescriptionObject.isValid;
    const isExistFileName = isValidFileNameObject.isValid;
    const isExistSoureCode = isValidSourceCodeObject.isValid;
    return (
      isExistTitle ||
      // isExistTagList ||
      isExistDescription ||
      isExistFileName ||
      isExistSoureCode
    );
  }, [
    isValidTitleObject,
    // isValidTagsObject,
    isValidDescriptionObject,
    isValidFileNameObject,
    isValidSourceCodeObject,
  ]);

  const validFalseIncluded = useCallback(() => {
    const validList = inputFileNameLists.map(el => el.isValid);
    return validList.includes(false);
  }, [inputFileNameLists]);

  const updateButtonText = useCallback((value: ButtonText) => {
    setButtonText(value);
  }, []);

  const updateCanPublish = useCallback((isValid: boolean, message = '') => {
    setCanPublish({
      ...canPublish,
      isValid: isValid,
      message: message,
    });
  }, []);

  const updateIsValidSourceCode = useCallback(
    (isValid: boolean): void => {
      inputFileNameLists[currentIndex].isValid = isValid;
    },
    [sourceCode, inputFileNameLists]
  );

  const validAllFileNameLength = useCallback(() => {
    let isValid = false;
    for (const item of inputFileNameLists) {
      const fileName = item.fileName;
      isValid = Validation.validLength(fileName, CONSTS.MAX_FILE_NAME_LENGTH);
      if (!isValid) break;
    }
    return isValid;
  }, [inputFileNameLists]);

  const prepareValidRegister = () => {
    if (!isValidTitleObject.isValid) {
      updateCanPublish(false, isValidTitleObject.message);
      return;
    }
    // if (!isValidTagsObject.isValid) {
    //   updateCanPublish(false, isValidTagsObject.message);
    //   return;
    // }
    if (!isValidDescriptionObject.isValid) {
      updateCanPublish(false, isValidDescriptionObject.message);
      return;
    }
    if (!validAllFileNameLength()) {
      updateCanPublish(false, validMessages.OVER_LENGTH_FILE_NAME);
      return;
    }
    if (!isValidSourceCodeObject.isValid) {
      updateCanPublish(false, isValidSourceCodeObject.message);
      return;
    }
    initCanPublish();
    setIsOpenDialog(true);
  };

  const registerContent = async () => {
    if (!isValidBudget.isValid) {
      updateCanPublish(false, '正しい予算を設定してください');
      return;
    }
    if (programmingIcon.value === '') {
      updateCanPublish(false, 'アイコンを選択してください');
      return;
    }
    const err = new Error();
    const params = createParams('published');
    try {
      const result = await putContent(params);
      if (result.status !== 200) throw err;
      setIsPosted(true);
      setIsSuccessed(true);
    } catch {
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  const draftContent = async () => {
    if (!isValidTitleObject.isValid) {
      updateCanPublish(false, isValidTitleObject.message);
      return;
    }
    if (!(description.length <= CONSTS.MAX_DESCRIPTION_LENGTH)) {
      updateCanPublish(false, validMessages.OVER_LENGTH_DESCRIPION);
      return;
    }
    if (!(sourceCode.length <= CONSTS.MAX_SOURCE_CODE_LENGTH)) {
      updateCanPublish(false, validMessages.OVER_LENGTH_SOURCE_CODE);
      return;
    }
    const isValidFalseIncluded = validFalseIncluded();
    if (isValidFalseIncluded) return;
    const err = new Error();
    const params = createParams('draft');
    updateButtonText('保存中...');
    try {
      const result = await putContent(params);
      if (result.status !== 200) throw err;
      setIsPosted(true);
      updateButtonText('保存済み ✔︎');
    } catch {
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidTitleObject,
        isValidTitleObject
      );
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_TITLE_LENGTH,
        validMessages.OVER_LENGTH_TITLE
      );
      if (!isValidMaxLength) return;
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_TITLE
      );
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed();
      }
      setTitle(value);
    },
    [title]
  );

  // const changeTagList = useCallback(
  //   (values: string[]): void => {
  //     if (values.length > CONSTS.MAX_TAGS_LENGTH) return;
  //     const prepareContentBeforePost = new PrepareContentBeforePost(
  //       values,
  //       setIsValidTagsObject,
  //       isValidTagsObject
  //     );
  //     const isNotValidZeroLength = prepareContentBeforePost.validZeroLength(
  //       validMessages.REQUIRED_TAGS
  //     );
  //     if (isNotValidZeroLength) {
  //       prepareContentBeforePost.successed();
  //     }
  //     setTagList(values);
  //   },
  //   [tagList]
  // );

  const changeDescritption = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidDescriptionObject,
        isValidDescriptionObject
      );
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_DESCRIPTION_LENGTH,
        validMessages.OVER_LENGTH_DESCRIPION
      );
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_DESCRIPTION
      );
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed();
      }
      setDescription(value);
    },
    [description]
  );

  const changeFileName = useCallback(
    (value: string, index: number) => {
      updateInputFileNameLists('fileName', value, index);
      const isValidMaxLength = Validation.validLength(
        value,
        CONSTS.MAX_FILE_NAME_LENGTH
      );
      console.log(isValidMaxLength, 'isValidMaxLength');

      if (!isValidMaxLength) {
        setIsValidFileNameObject(
          createValidObject(false, validMessages.OVER_LENGTH_FILE_NAME)
        );
        return;
      }

      const isExists = Validation.validEmpty(value);
      if (!isExists) {
        setIsValidFileNameObject(
          createValidObject(false, validMessages.REQUIRED_FILE_NAME)
        );
        return;
      }

      setIsValidFileNameObject(createValidObject(true, ''));
      setCurrentIndex(index);
    },
    [sourceCode, inputFileNameLists]
  );

  const changeSourceCode = useCallback(
    (value: string): void => {
      const isValidMaxLength = Validation.validLength(
        value,
        CONSTS.MAX_SOURCE_CODE_LENGTH
      );
      if (!isValidMaxLength) {
        setIsValidSourceCodeObject(
          createValidObject(false, validMessages.OVER_LENGTH_SOURCE_CODE)
        );
        return;
      }

      const isExists = Validation.validEmpty(value);
      if (!isExists) {
        setIsValidSourceCodeObject(
          createValidObject(false, validMessages.REQUIRED_SOURCE_CODE)
        );
        return;
      }

      setIsValidSourceCodeObject(createValidObject(true, ''));
      setSourceCode(value);
      updateIsValidSourceCode(isValidMaxLength);
      updateSourceCodeAndBodyHtml(value, currentIndex);
    },
    [sourceCode, inputFileNameLists]
  );

  const changeActiveStep = useCallback(
    (value: number): void => {
      setActiveStep(value);
    },
    [activeStep]
  );

  const isValidInputState = useCallback(
    (newInputFileNameLists: FileNameType[]) => {
      const inputStateList = newInputFileNameLists.map(
        el => el.fileName === ''
      );
      return inputStateList.length > 0;
    },
    [sourceCode, inputFileNameLists]
  );

  const addListsItem = (): void => {
    setInputFileNameLists([
      ...inputFileNameLists,
      {
        key: uuidv4(),
        fileName: '',
        sourceCode: '```\n\n```',
        bodyHtml: '',
        isValid: true,
        isAuto: false,
      },
    ]);
    setIsValidFileNameObject(
      createValidObject(false, validMessages.REQUIRED_FILE_NAME)
    );
  };

  const deleteListsItem = useCallback(
    (key: string, index: number): void => {
      const currentLength = inputFileNameLists.length;
      // 最新のインプットタグを消すかどうかの処理
      const shourdSetIndex = index === currentLength - 1 ? index - 1 : index;
      const newLists = inputFileNameLists.filter(el => el.key !== key);
      const currentItem = newLists[shourdSetIndex];
      const sourceCode = currentItem.sourceCode;
      const newInputFileNameLists = newLists.slice();
      // 現在のインプットタグの入力状況を検証する
      const isExistsNotInputItem = isValidInputState(newInputFileNameLists);
      setCurrentIndex(shourdSetIndex);
      setSourceCode(sourceCode);
      setInputFileNameLists(newInputFileNameLists);
      setIsValidFileNameObject(
        createValidObject(
          isExistsNotInputItem,
          isExistsNotInputItem ? validMessages.REQUIRED_FILE_NAME : ''
        )
      );
    },
    [sourceCode, inputFileNameLists]
  );

  const updateSourceCodeAndBodyHtml = (value: any, index: number) => {
    const currentItem = inputFileNameLists[index];
    const newFileItem = {
      ...currentItem,
      sourceCode: value,
      bodyHtml: marked(value),
    };
    const newInputFileNameLists = inputFileNameLists.slice();
    newInputFileNameLists[index] = newFileItem;
    setInputFileNameLists(newInputFileNameLists);
  };

  const updateInputFileNameLists = (key: string, value: any, index: number) => {
    const currentItem = inputFileNameLists[index];
    const newFileItem = { ...currentItem, [key]: value, isAuto: false };
    const newInputFileNameLists = inputFileNameLists.slice();
    newInputFileNameLists[index] = newFileItem;
    setInputFileNameLists(newInputFileNameLists);
  };

  const onFocusGetIndex = useCallback(
    (index: number) => {
      const currentItem = inputFileNameLists[index];
      const sourceCode = currentItem.sourceCode;
      setCurrentIndex(index);
      setSourceCode(sourceCode);
    },
    [sourceCode, inputFileNameLists]
  );

  const onBlurGetLang = useCallback(
    (index: number) => {
      const BACK_QUOTE_LENGTH = 3;
      const currentItem = inputFileNameLists[index];
      const splitedFileName = currentItem.fileName.split('/');
      const sourceCode = currentItem.sourceCode;
      const lastItem = splitedFileName.pop()!;
      const targetIndex = lastItem.lastIndexOf('.');
      if (targetIndex === -1) {
        setCurrentIndex(index);
        setSourceCode(sourceCode);
      } else {
        // 言語が既に入力されていたらファイルネームの言語にリプレイスする
        let newSourceCode;
        const newLang = lastItem.substring(targetIndex + 1);
        const firstCharaLength = sourceCode.search('\n');
        // 既に入力されている言語を取得
        const oldLang = sourceCode.slice(BACK_QUOTE_LENGTH, firstCharaLength);
        if (oldLang === '') {
          // もし、バッククォートのみの場合はファイルネームの言語を差し込む
          const backQuote = sourceCode.slice(0, BACK_QUOTE_LENGTH);
          const restChara = sourceCode.slice(BACK_QUOTE_LENGTH);
          newSourceCode = `${backQuote}${newLang}${restChara}`;
        } else {
          newSourceCode = sourceCode.replace(oldLang, newLang);
        }
        setCurrentIndex(index);
        setSourceCode(newSourceCode);
      }
    },
    [sourceCode, inputFileNameLists]
  );

  const handleTabChange = useCallback(
    (_: React.ChangeEvent<{}>, index: number) => {
      setCurrentIndex(index);
      onFocusGetIndex(index);
    },
    [sourceCode, inputFileNameLists]
  );

  const selectTargetLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setTargetLanguageValue(value);
  };

  const changeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValidNumber = Validation.validNumber(event.target.value);
    if (!isValidNumber) {
      return;
    }
    const value = Number(event.target.value);
    const isValid = Validation.validPrice(value);
    if (!isValid) {
      setIsValidBudget(
        createValidObject(false, validMessages.ZERO_UNDER_OVER_MAX_PRICE)
      );
    } else {
      setIsValidBudget(createValidObject(true, ''));
    }
    setBudget(value);
  };

  const selectProgrammingIcon = (
    _: React.ChangeEvent<{}>,
    selectObject: string | ProgrammingIcon | null
  ) => {
    if (selectObject === null) return;
    if (typeof selectObject === 'string') return;
    setProgrammingIcon({
      ...programmingIcon,
      id: selectObject.id,
      value: selectObject.value,
      iconPath: selectObject.iconPath,
      ogpPath: selectObject.ogpPath,
    });
  };

  const moveSettingActivity = () => {
    router.push('/settings/activity');
  };

  const getRepos = async () => {
    if (!hasGithubAccessToken) {
      alert('設定ページへ移動します。');
      moveSettingActivity();
      return;
    }
    setIsOpenGithubDialog(true);
    if (!isFetchGithubData) return;
    try {
      const result = await getGithubRepos();
      setRepos(result.data.repos);
      setIsFetchGithubData(false);
    } catch (error) {
      console.error(error);
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  const getBranches = async (repository: string) => {
    try {
      const result = await getGithubBranches({ repository });
      const newRepos = repos.slice();
      for (const repo of newRepos) {
        if (repo.fullName === repository) {
          repo.branches = result.data.branches;
          break;
        }
      }
      setRepos(newRepos);
      setIsFetchGithubData(false);
    } catch (error) {
      console.error(error);
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  const getSourceTreeByBranch = async (repository: string, branch: string) => {
    return await getGithubSourceTree({ repository, branch });
  };

  const embedDiffInputFileNameLists = (choosedFullPathList: string[]) => {
    const resultList = [];
    for (const item of inputFileNameLists) {
      const fileName = item.fileName;
      const isIncludes = choosedFullPathList.includes(fileName);
      const isExistsFileName = fileName !== '';
      // リポジトリダイアログ内で選択されているファイルと、inputタグに入力があるファイルしか残さない
      if (isIncludes || (isExistsFileName && !item.isAuto)) {
        resultList.push(item);
        // 手動で入力されたデータをvalidation checkする
        validationForFileName(item.fileName);
        validationForSourceCode(item.sourceCode);
      }
    }
    return resultList;
  };

  const validationForFileName = (fileName: string) => {
    const isValidMaxLength = Validation.validLength(
      fileName,
      CONSTS.MAX_FILE_NAME_LENGTH
    );
    if (!isValidMaxLength) {
      setIsValidFileNameObject(
        createValidObject(false, validMessages.OVER_LENGTH_FILE_NAME)
      );
      return;
    }

    const isExists = Validation.validEmpty(fileName);
    if (!isExists) {
      setIsValidFileNameObject(
        createValidObject(false, validMessages.REQUIRED_FILE_NAME)
      );
      return;
    }
  };

  const validationForSourceCode = (sourceCode: string) => {
    const isValidMaxLength = Validation.validLength(
      sourceCode,
      CONSTS.MAX_SOURCE_CODE_LENGTH
    );
    if (!isValidMaxLength) {
      setIsValidSourceCodeObject(
        createValidObject(false, validMessages.OVER_LENGTH_SOURCE_CODE)
      );
      return;
    }

    const isExists = Validation.validEmpty(sourceCode);
    if (!isExists) {
      setIsValidSourceCodeObject(
        createValidObject(false, validMessages.REQUIRED_SOURCE_CODE)
      );
      return;
    }
  };

  const execuDecodeContent = (
    selectFullPath: string,
    encodeContents: { [key: string]: string }
  ) => {
    const lang = selectFullPath.split('.').pop();
    const encodeContent = encodeContents[selectFullPath];
    const decodeContent = window.atob(encodeContent);
    const bedginMd = `\`\`\`${lang}\n`;
    const endMd = '\n```';
    return `${bedginMd}${decodeContent}${endMd}`;
  };

  const initValidFileNameAndSourceCode = () => {
    setIsValidFileNameObject(createValidObject(true, ''));
    setIsValidSourceCodeObject(createValidObject(true, ''));
  };

  const insertToInputFileNameLists = (
    choosedFullPathList: string[],
    encodeContents: { [key: string]: string }
  ) => {
    // 一度validationの状態をリセットする
    initValidFileNameAndSourceCode();
    // リポジトリダイアログ内で削除したファイルは消しつつ、手動で入力したものは残す処理
    const newInputFileNameLists = embedDiffInputFileNameLists(
      choosedFullPathList
    );
    for (const selectFullPath of choosedFullPathList) {
      const existsItem = newInputFileNameLists.filter(
        el => el.fileName === selectFullPath
      );
      if (existsItem.length > 0) continue;
      const mdContent = execuDecodeContent(selectFullPath, encodeContents);
      if (isValidFileNameObject.isValid) {
        validationForFileName(selectFullPath);
      }
      if (isValidSourceCodeObject.isValid) {
        validationForSourceCode(mdContent);
      }
      newInputFileNameLists.push({
        key: uuidv4(),
        fileName: selectFullPath,
        sourceCode: mdContent,
        bodyHtml: marked(mdContent),
        isValid: true,
        isAuto: true,
      });
    }
    onFocusGetIndex(0);
    setInputFileNameLists(newInputFileNameLists);
    setSourceCode(newInputFileNameLists[0].sourceCode);
    setIsOpenGithubDialog(false);
  };

  const closeGithubDialog = () => {
    setIsOpenGithubDialog(false);
  };

  return {
    authorId,
    title,
    type,
    isSuccessed,
    description,
    sourceCode,
    inputFileNameLists,
    targetLanguageValue,
    budget,
    programmingIcon,
    activeStep,
    currentIndex,
    isOpenDialog,
    isOpenTreeDialog,
    setIsOpenTreeDialog,
    isOpenGithubDialog,
    buttonText,
    canPublish,
    isValidBudget,
    hasGithubAccessToken,
    isLoading,
    isFetchGithubData,
    repos,

    previousPage,
    closeSnackBar,
    closeDialog,
    prepareValidRegister,
    registerContent,
    draftContent,
    changeTitle,
    changeDescritption,
    changeFileName,
    changeSourceCode,
    changeActiveStep,
    addListsItem,
    deleteListsItem,
    onBlurGetLang,
    onFocusGetIndex,
    handleTabChange,
    selectTargetLanguage,
    changeBudget,
    selectProgrammingIcon,
    updateButtonText,
    updateCanPublish,
    getRepos,
    getBranches,
    getSourceTreeByBranch,
    insertToInputFileNameLists,
    closeGithubDialog,
  };
};
