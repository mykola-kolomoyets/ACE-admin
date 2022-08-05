import { FC } from 'react';

import { ParagraphView, TitleView } from '../../utils/enums/typography';

import Typography from '../../components/typography';

import styles from './email-sent.module.scss';
import SuccessIcon from '../../icons/Success';
import Section from '../../components/section';

const EmailSent: FC = () => {
  return (
    <section className={styles.container}>
      <Section className={styles.email_sent}>
        <section className={styles.email_sent__icon}>
          <SuccessIcon />
        </section>

        <Typography.Title
          className={styles.email_sent__title}
          view={TitleView.medium}
          isCentered
        >
          Check your email
        </Typography.Title>

        <Typography.Paragraph
          className={styles.email_sent__description}
          view={ParagraphView.medium}
          isCentered
        >
          We sent the confirmation email to:
          <Typography.Paragraph
            className={styles.email_sent__email}
            view={ParagraphView.small}
            isBold
            isCentered
          >
            {localStorage.getItem('ResetPasswordEmail')}
          </Typography.Paragraph>
        </Typography.Paragraph>

        <Typography.Paragraph
          className={styles.email_sent__additional}
          view={ParagraphView.small}
          isCentered
        >
          Check your email and click on the confirmation link to continue
        </Typography.Paragraph>

        <section className={styles.email_sent__footer}>
          <Typography.Paragraph view={ParagraphView.xSmall} isBold isCentered>
            You can close this tab
          </Typography.Paragraph>
        </section>
      </Section>
    </section>
  );
};

export default EmailSent;