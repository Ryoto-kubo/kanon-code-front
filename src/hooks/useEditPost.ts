import { errorMessages, validMessages } from '@/consts/error-messages';
import { ProgrammingIcon } from '@/types/global';
import { getContent } from '@/utils/api/get-content';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ValidObject = {
  isValid: boolean;
  message: string;
};
type ButtonText = Readonly<
  '投稿設定' | '編集設定' | '下書き保存' | '保存中...' | '保存済み ✔︎'
>;

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
  const [tagList, setTagList] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [sourceCode, setSourceCode] = useState('```\n\n```');
  const [inputFileNameLists, setInputFileNameLists] = useState([
    {
      key: uuidv4(),
      fileName: '',
      sourceCode: '```\n\n```',
      bodyHtml: '',
      isValid: true,
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

  useEffect(() => {
    (async () => {
      try {
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
        setTagList(post.contents.tagList);
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

  return {
    isLoading,
    authorId,
    keys,
    type,
    buttonText,
    setButtonText,
    title,
    setTitle,
    isSuccessed,
    setIsSuccessed,
    tagList,
    setTagList,
    description,
    setDescription,
    sourceCode,
    setSourceCode,
    inputFileNameLists,
    setInputFileNameLists,
    targetLanguageValue,
    setTargetLanguageValue,
    budget,
    setBudget,
    programmingIcon,
    setProgrammingIcon,
    isValidTitleObject,
    setIsValidTitleObject,
    isValidTagsObject,
    setIsValidTagsObject,
    isValidDescriptionObject,
    setIsValidDescriptionObject,
    isValidFileNameObject,
    setIsValidFileNameObject,
    isValidSourceCodeObject,
    setIsValidSourceCodeObject,
    isValidBudget,
    setIsValidBudget,
  };
};
