import { errorMessages } from '@/consts/error-messages';
import { getContent } from '@/utils/api/get-content';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ProgrammingIcon = {
  id: number;
  value: string;
  iconPath: string;
};

const getAuthorId = (partitionKey: string) => {
  const userIdIndex = 1;
  return partitionKey.split('#')[userIdIndex];
};

export const useEditPost = (postId: string) => {
  const [authorId, setAurhorId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<'post_published' | 'post_draft' | ''>('');
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

  useEffect(() => {
    (async () => {
      try {
        const result = await getContent({ postId });
        const post = result.data.post;
        setAurhorId(getAuthorId(post.partition_key));
        setType(post.type);
        setTitle(post.contents.title);
        setTagList(post.contents.tagList);
        setDescription(post.contents.description.value);
        setSourceCode(post.contents.inputFileNameLists[0].sourceCode);
        setInputFileNameLists(post.contents.inputFileNameLists);
        setTargetLanguageValue(post.contents.targetLanguage);
        setProgrammingIcon(post.contents.targetIcon);
        setIsLoading(false);
      } catch (error) {
        alert(errorMessages.SYSTEM_ERROR);
      }
    })();
  }, []);

  return {
    isLoading,
    authorId,
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
  };
};
