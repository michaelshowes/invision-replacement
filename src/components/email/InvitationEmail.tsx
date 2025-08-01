import * as React from 'react';

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

interface OrganizationInvitationEmailProps {
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  teamName: string;
  inviteLink: string;
}

export default function InvitationEmail(
  props: OrganizationInvitationEmailProps
) {
  const { email, invitedByUsername, invitedByEmail, teamName, inviteLink } =
    props;

  return (
    <Html
      lang='en'
      dir='ltr'
    >
      <Tailwind>
        <Head />
        <Preview>You've been invited to join {teamName}</Preview>
        <Body className='bg-gray-100 py-[40px] font-sans'>
          <Container className='mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-sm'>
            {/* Header */}
            <Section className='mb-[32px] text-center'>
              <Heading className='m-0 mb-[8px] text-[28px] font-bold text-gray-900'>
                You're invited to join {teamName}
              </Heading>
              <Text className='m-0 text-[16px] text-gray-600'>
                {invitedByUsername} has invited you to collaborate
              </Text>
            </Section>

            {/* Main Content */}
            <Section className='mb-[32px]'>
              <Text className='m-0 mb-[16px] text-[16px] leading-[24px] text-gray-700'>
                Hi there,
              </Text>
              <Text className='m-0 mb-[16px] text-[16px] leading-[24px] text-gray-700'>
                <strong>{invitedByUsername}</strong> ({invitedByEmail}) has
                invited you to join <strong>{teamName}</strong>. You'll be able
                to collaborate with the team and access shared resources once
                you accept this invitation.
              </Text>
              <Text className='m-0 mb-[24px] text-[16px] leading-[24px] text-gray-700'>
                Click the button below to accept your invitation and get
                started:
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className='mb-[32px] text-center'>
              <Button
                href={inviteLink}
                className='box-border inline-block rounded-[8px] bg-blue-600 px-[32px] py-[12px] text-[16px] font-semibold text-white no-underline'
              >
                Accept Invitation
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className='mb-[32px]'>
              <Text className='m-0 mb-[8px] text-[14px] leading-[20px] text-gray-600'>
                If the button doesn't work, you can copy and paste this link
                into your browser:
              </Text>
              <Link
                href={inviteLink}
                className='text-[14px] break-all text-blue-600'
              >
                {inviteLink}
              </Link>
            </Section>

            {/* Security Note */}
            <Section className='mb-[32px] border-t border-gray-200 pt-[24px]'>
              <Text className='m-0 text-[14px] leading-[20px] text-gray-600'>
                <strong>Note:</strong> This invitation was sent to {email}. If
                you weren't expecting this invitation, you can safely ignore
                this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className='border-t border-gray-200 pt-[24px]'>
              <Text className='m-0 mb-[8px] text-[12px] leading-[16px] text-gray-500'>
                © {new Date().getFullYear()} {teamName}. All rights reserved.
              </Text>
              <Text className='m-0 text-[12px] leading-[16px] text-gray-500'>
                123 Business Street, Suite 100, Business City, BC 12345
              </Text>
              <Text className='m-0 mt-[8px] text-[12px] leading-[16px] text-gray-500'>
                <Link
                  href='#'
                  className='text-gray-500 no-underline'
                >
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
