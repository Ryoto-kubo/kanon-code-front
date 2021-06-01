import { CustomLoader } from "@/components/common/loader";
import { ContentHeader } from "@/components/molecules/ContentHeader";
import { FileExChange } from "@/components/molecules/FileExChange";
import { ProfileContentFile } from "@/components/molecules/ProfileContentFile";
import { ProfileContentLink } from "@/components/molecules/ProfileContentLink";
import { ContentWrapper } from "@/components/organisms/ContentWrapper";
import { IconArrowNext } from "@/components/svg/materialIcons/IconArrowNext";
import { errorMessages } from "@/consts/error-messages";
import { SettingLayout } from "@/layouts/setting/";
import { UserType } from "@/types/global";
import { UserProfileProps } from "@/types/pages/settings/profile";
import { getPreSignedUrl } from "@/utils/api/get-presigned-url";
import { getUser } from "@/utils/api/get-user";
import { postUserIcon } from "@/utils/api/post-user-icon";
import * as S3 from "@/utils/api/s3";
import { PrepareImageBeforePost } from "@/utils/prepare-image-before-post";
import React, { useCallback, useState } from "react";
import useSWR from "swr";

type Props = {
  title: string;
  authUser: any;
  currentUser: UserType | null;
};

// export const getServerSideProps = async () => ({
//   props: {
//     layout: 'SettingLayout',
//     title: 'プロフィール',
//   },
// })

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>;
  // const [isLoading, setIsLoading] = useState(true);
  const [userId] = useState(props.authUser.username);
  const [user, setUser] = useState<UserType | null>(props.currentUser);
  const [test, setProfile] = useState<UserProfileProps>({
    display_name: "",
    github_name: "",
    icon_src: "",
    introduction: "",
    position_type: 0,
    price: 0,
    skils: [],
    twitter_name: "",
    web_site: "",
  });
  const params = {
    userId: userId,
  };
  const fetcher = async () => {
    return await getUser(params);
  };
  const { data, isValidating } = useSWR("/api/user", fetcher);
  const profile = data?.data.Item.user_profile;
  // setProfile(data?.data.Item.user_profile);
  // setIsLoading(isValidating);
  const isLoading = isValidating;
  console.log(test);

  // useEffect(() => {
  //   const err = new Error()
  //   ;(async () => {
  //     const params = {
  //       userId: userId,
  //     }
  //     try {
  //       const response = await getUser(params)
  //       const result = response.data
  //       if (!result.status) throw (err.message = result.status_message)
  //       setProfile(result.Item.user_profile)
  //       setIsLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //       alert(error)
  //     }
  //   })()
  // }, [])

  const validImageSizeAndExtention = (instance: PrepareImageBeforePost) => {
    const isValidImageSize = instance.validImageSize();
    const isValidFileExtention = instance.validImageExtention();
    return isValidImageSize && isValidFileExtention;
  };
  const changeIcon = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0];
      if (!file) return;
      const prepareImageBeforePost = new PrepareImageBeforePost(file);
      const isValid = validImageSizeAndExtention(prepareImageBeforePost);
      if (!isValid) return;
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
        updateIcon(newIconSrc);
      } catch (error) {
        alert(errorMessages.SYSTEM_ERROR);
        console.error(error);
      }
    },
    []
  );
  const updateIcon = async (newIconSrc: string) => {
    const err = new Error();
    const params = {
      userId: userId,
      iconSrc: newIconSrc,
    };
    try {
      const response = await postUserIcon(params);
      const result = response.data;
      if (!result.status) throw (err.message = result.status_message);
      const userProfile = props.currentUser!.user_profile;
      userProfile.icon_src = newIconSrc;
      setProfile({
        ...profile,
        icon_src: newIconSrc,
      });
      setUser({
        ...user!,
        user_profile: userProfile,
      });
    } catch (error) {
      alert(error);
    }
  };

  return isLoading ? (
    <SettingLayout title={`Kanon Code | プロフィール`} currentUser={user}>
      <CustomLoader width={40} height={40} />
    </SettingLayout>
  ) : (
    <SettingLayout title={`Kanon Code | プロフィール`} currentUser={user}>
      <section>
        <ContentWrapper>
          <ContentHeader
            title="プロフィール"
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
            />
          </ProfileContentFile>
          <ProfileContentLink
            label="名前"
            value={profile!.display_name}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
          <ProfileContentLink
            label="紹介文"
            value={profile!.introduction}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>

          <ProfileContentLink
            label="ポジション"
            value={profile!.position_type}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>

          <ProfileContentLink
            label="100文字あたりの設定金額"
            value={profile!.price}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>

          <ProfileContentLink
            label="Githubユーザーネーム"
            value={profile!.github_name}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>

          <ProfileContentLink
            label="Twitterユーザーネーム"
            value={profile!.twitter_name}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>

          <ProfileContentLink
            label="webサイト"
            value={profile!.web_site}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
        </ContentWrapper>
      </section>
    </SettingLayout>
  );
};

export default IndexPage;
