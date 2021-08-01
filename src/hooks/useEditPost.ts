import { errorMessages, validMessages } from '@/consts/error-messages';
import { getContent } from '@/utils/api/get-content';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ProgrammingIcon = {
  id: number;
  value: string;
  iconPath: string;
};
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
  const [authorId, setAurhorId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<'post_published' | 'post_draft' | ''>('');
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
  const [programmingIcon, setProgrammingIcon] = useState<ProgrammingIcon>({
    id: 0,
    value: '',
    iconPath: '',
  });
  const [isValidTitleObject, setIsValidTitleObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_TITLE)
  );
  const [isValidTagsObject, setIsValidTagsObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_TAGS)
  );
  const [isValidDescriptionObject, setIsValidDescriptionObject] = useState<
    ValidObject
  >(createValidObject(false, validMessages.REQUIRED_DESCRIPTION));
  const [isValidFileNameObject, setIsValidFileNameObject] = useState<
    ValidObject
  >(createValidObject(false, validMessages.REQUIRED_FILE_NAME));
  const [isValidSourceCodeObject, setIsValidSourceCodeObject] = useState<
    ValidObject
  >(createValidObject(false, validMessages.REQUIRED_SOURCE_CODE));

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
        setTitle(post.contents.title);
        setTagList(post.contents.tagList);
        setDescription(post.contents.description.value);
        setSourceCode(post.contents.inputFileNameLists[0].sourceCode);
        setInputFileNameLists(post.contents.inputFileNameLists);
        setTargetLanguageValue(post.contents.targetLanguage);
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
  };
};