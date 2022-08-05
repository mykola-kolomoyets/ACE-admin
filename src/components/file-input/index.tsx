import { ChangeEvent, FC, useRef } from 'react';

import { ButtonView } from '../../utils/enums/button';

import UploadIcon from '../../icons/Upload';

import Button from '../button';

import styles from './file-input.module.scss';
import Typography from '../typography';
import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';

type FileInputProps = {
  onFileUpload: (file?: File) => void;
  buttonText: string;
  errorMessage?: string;
};
const FileInput: FC<FileInputProps> = ({
  onFileUpload,
  buttonText,
  errorMessage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClick = () => fileInputRef.current?.click();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    onFileUpload(fileUploaded);
  };

  return (
    <section className={styles.fileInputContainer}>
      <section className={errorMessage ? styles.error : ''}>
        <Button
          view={ButtonView.ghost}
          LeftAddon={UploadIcon}
          onClick={onClick}
        >
          {buttonText}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onChange}
          style={{ display: 'none' }}
        />
      </section>

      {errorMessage && (
        <Typography.Paragraph
          className={styles.error__title}
          view={ParagraphView.xSmall}
          color={ParagraphColor.red}
        >
          {errorMessage}
        </Typography.Paragraph>
      )}
    </section>
  );
};

export default FileInput;
