import { CustomSnackbar } from "@/components/atoms/CustomSnackbar";
// import Snackbar from '@material-ui/core/Snackbar'
import { CustomLoader } from "@/components/common/loader";
import { ContentHeader } from "@/components/molecules/ContentHeader";
import { FileExChange } from "@/components/molecules/FileExChange";
import { ProfileContentFile } from "@/components/molecules/ProfileContentFile";
import { ProfileContentLink } from "@/components/molecules/ProfileContentLink";
import { ContentWrapper } from "@/components/organisms/ContentWrapper";
import { IconArrowNext } from "@/components/svg/materialIcons/IconArrowNext";
import { errorMessages, validMessages } from "@/consts/error-messages";
import { POSITIONS } from "@/consts/positions";
// import useSWR from "swr";
import { useUser } from "@/hooks/useUser";
import { SettingLayout } from "@/layouts/setting/";
import { UserTypes } from "@/types/global";
import { getPreSignedUrl } from "@/utils/api/get-presigned-url";
import { postUserProfile } from "@/utils/api/post-user-profile";
import * as S3 from "@/utils/api/s3";
import { PrepareImageBeforePost } from "@/utils/prepare-image-before-post";
import Box from "@material-ui/core/Box";
import React, { useCallback, useState } from "react";

type Props = {
  title: string;
  authUser: any;
  currentUser: UserTypes | null;
};
type ValidObject = {
  isValid: boolean;
  message: string;
};

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>;
  const userId = props.authUser.username;
  const createValidObject = useCallback((defaultValue, defaultMessage) => {
    return {
      isValid: defaultValue,
      message: defaultMessage,
    };
  }, []);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [canPublish, setCanPUblish] = useState<ValidObject>(
    createValidObject(true, "")
  );
  const { user, setUser, isLoading } = useUser(userId, props.currentUser);
  const profile = user.user_profile;
  // const fetcher = async () => {
  //   return await getUser(params);
  // };
  // const { data, isValidating } = useSWR(`/api/user?userId${userId}`, fetcher, {
  //   // initialData: props.currentUser!.user_profile,
  //   refreshInterval: 0,
  //   dedupingInterval: 2000,
  //   revalidateOnFocus: false,
  //   focusThrottleInterval: 5000,
  // });

  // const profile = data?.Item.user_profile;
  // const profile = data?.data.Item.user_profile;
  // const isLoading = isValidating;
  // console.log(data, "data");
  // console.log(isValidating, "isValidating");

  const updateCanPublish = useCallback((isValid: boolean, message = "") => {
    setCanPUblish({
      ...canPublish,
      isValid: isValid,
      message: message,
    });
  }, []);

  const closeSnackBar = () => {
    setCanPUblish({
      ...canPublish,
      isValid: true,
    });
  };

  const validFileExtentionAndFileSize = (instance: PrepareImageBeforePost) => {
    const isValidFileExtention = instance.validImageExtention();
    if (!isValidFileExtention) {
      updateCanPublish(false, validMessages.NOT_ACCEPT_FILE_EXTENTION);
      return false;
    }
    const isValidImageSize = instance.validImageSize();
    if (!isValidImageSize) {
      updateCanPublish(false, validMessages.OVER_FILE_SIZE);
      return false;
    }
    return isValidFileExtention && isValidImageSize;
  };

  const changeIcon = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0];
      if (!file) return;
      const prepareImageBeforePost = new PrepareImageBeforePost(file);
      const isValid = validFileExtentionAndFileSize(prepareImageBeforePost);
      if (!isValid) return;
      setIsUploading(true);
      const err = new Error();
      const newFileName = prepareImageBeforePost.createNewFileName();
      try {
        const compressedFile = await prepareImageBeforePost.compressionImage();
        if (!compressedFile) throw err;
        const response = await getPreSignedUrl(newFileName);
        const result = response.data;
        if (!result.status) throw err;
        const presignedUrl = result.presignedUrl;
        await S3.uploadImageToS3(presignedUrl, compressedFile);
        const newIconSrc = `${process.env.NEXT_PUBLIC_BUCKET_URL}upload/${newFileName}`;
        updateProfile(newIconSrc);
      } catch (error) {
        console.error(error);
        alert(errorMessages.SYSTEM_ERROR);
        setIsUploading(false);
      }
    },
    []
  );

  const updateProfile = useCallback(
    async (newIconSrc: string) => {
      const err = new Error();
      const userProfile = profile;
      userProfile.icon_src = newIconSrc;
      const params = {
        userId: userId,
        userProfile: userProfile,
      };
      try {
        const response = await postUserProfile(params);
        const result = response.data;
        if (!result.status) throw (err.message = result.status_message);
        profile.icon_src = newIconSrc;
        setUser({
          ...user!,
          user_profile: userProfile,
        });
        setIsUploading(false);
      } catch (error) {
        alert(error);
        setIsUploading(false);
      }
    },
    [profile]
  );

  return (
    <SettingLayout title={`Kanon Code | プロフィール`} currentUser={user}>
      {isLoading ? (
        <CustomLoader width={40} height={40} />
      ) : (
        <>
          <section>
            <ContentWrapper>
              <ContentHeader
                title="Profile"
                description="Kanon Codeを利用する全てのユーザーに公開されます。"
                fontSize={20}
                marginBottom={1}
              />
              <ProfileContentFile
                label="アイコン"
                description="写真を追加することでアカウントをカスタマイズできます"
                isDivider={false}
                htmlFor="avatar"
              >
                <FileExChange
                  htmlFor="avatar"
                  picture={profile!.icon_src}
                  changeIcon={changeIcon}
                  isUploading={isUploading}
                />
              </ProfileContentFile>
              <ProfileContentLink
                label="名前"
                value={profile!.display_name}
                isDivider={true}
                href="/name"
              >
                <IconArrowNext fontSize="large" color="action" />
              </ProfileContentLink>
              <ProfileContentLink
                label="紹介文"
                value={profile!.introduction}
                isDivider={true}
                href="/introduction"
              >
                <IconArrowNext fontSize="large" color="action" />
              </ProfileContentLink>

              <ProfileContentLink
                label="ポジション"
                value={POSITIONS[profile!.position_type].label}
                isDivider={true}
                href="/position"
              >
                <IconArrowNext fontSize="large" color="action" />
              </ProfileContentLink>

              <ProfileContentLink
                label="100文字あたりの設定金額"
                value={profile!.price}
                isDivider={true}
                href="/price"
              >
                <IconArrowNext fontSize="large" color="action" />
              </ProfileContentLink>

              <ProfileContentLink
                label="Githubユーザーネーム"
                value={profile!.github_name}
                isDivider={true}
                href="/github_name"
              >
                <IconArrowNext fontSize="large" color="action" />
              </ProfileContentLink>

              <ProfileContentLink
                label="Twitterユーザーネーム"
                value={profile!.twitter_name}
                isDivider={true}
                href="/twitter_name"
              >
                <IconArrowNext fontSize="large" color="action" />
              </ProfileContentLink>

              <ProfileContentLink
                label="webサイト"
                value={profile!.web_site}
                isDivider={true}
                href="/web_site"
              >
                <IconArrowNext fontSize="large" color="action" />
              </ProfileContentLink>
            </ContentWrapper>
          </section>
          <CustomSnackbar
            isOpen={!canPublish.isValid}
            closeSnackBar={closeSnackBar}
          >
            <Box fontWeight="bold">{canPublish.message}</Box>
          </CustomSnackbar>
        </>
      )}
    </SettingLayout>
  );
};

export default IndexPage;
