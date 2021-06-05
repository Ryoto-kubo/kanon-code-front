import { CustomSwitch } from "@/components/atoms/CustomSwitch";
import { CustomLoader } from "@/components/common/loader";
import { ContentHeader } from "@/components/molecules/ContentHeader";
import { LinkGithubButton } from "@/components/molecules/LinkGithubButton";
import { ProfileContentCheck } from "@/components/molecules/ProfileContentCheck";
import { ContentWrapper } from "@/components/organisms/ContentWrapper";
import { IconArrowNext } from "@/components/svg/materialIcons/IconArrowNext";
import { SettingLayout } from "@/layouts/setting/";
import { EmailNoticesProps, UserType } from "@/types/global";
import { getUser } from "@/utils/api/get-user";
import React, { useEffect, useState } from "react";

// import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
  currentUser: UserType | null;
};
type EmailNoticesTypes = Readonly<"is_opened_review" | "is_requested_review">;

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>;
  const [emailNotices, setEmailNotices] = useState<EmailNoticesProps>(
    props.currentUser!.email_notices
  );
  const [userId] = useState(props.authUser.username);
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useState<UserType | null>(props.currentUser);

  const params = {
    userId: userId,
  };

  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const response = await getUser(params);
        const result = response.data;
        if (!result.status) throw (err.message = result.status_message);
        setEmailNotices(result.Item.email_notices);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    })();
  }, []);

  const linkOnGithub = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };
  const updateEmailNotices = (key: EmailNoticesTypes, value: boolean) => {
    emailNotices[key] = value;
    console.log(emailNotices);
  };
  const changeOpenedReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setEmailNotices({ ...emailNotices, is_opened_review: isChecked });
    updateEmailNotices("is_opened_review", isChecked);
  };
  const changeRequestedReview = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.currentTarget.checked;
    setEmailNotices({ ...emailNotices, is_requested_review: isChecked });
    updateEmailNotices("is_requested_review", isChecked);
  };

  return (
    <SettingLayout title={`Kanon Code | プロフィール`} currentUser={user}>
      {isLoading ? (
        <CustomLoader width={40} height={40} />
      ) : (
        <>
          <section>
            <ContentWrapper>
              <ContentHeader
                title="Email Notice"
                description="ONにすることによってKanon Codeをより使いやすく設定できます。"
                fontSize={20}
                marginBottom={1}
              />
              <ProfileContentCheck
                label="レビューが開封された時"
                value={emailNotices.is_opened_review ? "ON" : "OFF"}
                isDivider={false}
              >
                <CustomSwitch
                  onChange={changeOpenedReview}
                  checked={emailNotices.is_opened_review}
                />
              </ProfileContentCheck>
              <ProfileContentCheck
                label="レビューリクエストを受け取ったとき"
                value={emailNotices.is_requested_review ? "ON" : "OFF"}
                isDivider={true}
              >
                <CustomSwitch
                  onChange={changeRequestedReview}
                  checked={emailNotices.is_requested_review}
                />
              </ProfileContentCheck>
            </ContentWrapper>
            <ContentWrapper>
              <ContentHeader
                title="Link"
                description="Github連携を行うことでKanon Codeをより使いやすく設定できます。"
                fontSize={20}
                marginBottom={1}
              />
              <ProfileContentCheck
                label="Github連携"
                value={false ? "ON" : "OFF"}
                isDivider={false}
              >
                <LinkGithubButton onClick={linkOnGithub} />
              </ProfileContentCheck>
            </ContentWrapper>
            <ContentWrapper>
              <ContentHeader
                title="Delete Account"
                description="アカウントが不要になった場合は削除できます。"
                fontSize={20}
                marginBottom={1}
              />
              <ProfileContentCheck
                label="アカウント削除"
                value=""
                isDivider={false}
              >
                <IconArrowNext fontSize="large" color="action" />
              </ProfileContentCheck>
            </ContentWrapper>
          </section>
        </>
      )}
    </SettingLayout>
  );
};

export default IndexPage;
