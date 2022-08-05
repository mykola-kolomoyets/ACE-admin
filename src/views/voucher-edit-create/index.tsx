/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import NumberFormat from 'react-number-format';

import BreadCrumbs from '../../components/breadcrumbs';
import Typography from '../../components/typography';
import Button from '../../components/button';
import { ButtonView } from '../../utils/enums/button';
import CheckmarkIcon from '../../icons/Checkmark';
import Section from '../../components/section';
import Input from '../../components/input';
import FileInput from '../../components/file-input';
import Select from '../../components/select';
import Table from '../../components/table';

import CloseIcon from '../../icons/Close';
import PlusIcon from '../../icons/Plus';

import {
  ParagraphColor,
  ParagraphView,
  TitleView
} from '../../utils/enums/typography';
import { dashboardPaths } from '../../utils/paths';

import styles from './voucher-edit-create.module.scss';
import useEditCreateVoucher from './voucher-edit-create.hook';
import { hoc } from '../../utils/hoc';

const EditCreateVoucher = hoc(
  useEditCreateVoucher,
  ({
    id,

    mockProducts,
    holders,
    values,
    errors,

    onNameChange,
    onHolderChange,
    onImageUpload,
    onRowNameChange,
    onAddRow,
    onDeleteRow,
    onDeleteImageClick,
    onCancel,
    onSubmit
  }) => {
    return (
      <section className={styles.voucher_update}>
        <section className={styles.voucher_update__title}>
          <BreadCrumbs
            current={id ? 'Edit voucher' : 'New voucher'}
            start={{
              label: 'Vouchers',
              route: dashboardPaths.vouchers.slice(1)
            }}
          />

          <div className={styles.voucher_update__buttons}>
            <Button view={ButtonView.ghost} onClick={onCancel}>
              Discard
            </Button>

            <Button
              view={ButtonView.primary}
              LeftAddon={CheckmarkIcon}
              onClick={onSubmit}
            >
              Save changes
            </Button>
          </div>
        </section>

        <section className={styles.voucher_update__content}>
          <Section>
            <Typography.Title
              view={TitleView.small}
              className={styles.voucher_update__content_title}
            >
              Voucher content
            </Typography.Title>

            <section className={styles.voucher_update__inputs}>
              <Input
                className={styles.voucher_update__input}
                name="name"
                label="Voucher name"
                inputProps={{
                  type: 'text',
                  value: values.name,
                  onChange: onNameChange,
                  placeholder: 'Enter a voucher name'
                }}
                errorMessage={errors.name}
              />

              <Select
                options={holders}
                onChange={onHolderChange}
                label="Voucher holder"
                value={values.holder}
                placeholder="Select a user to assign this voucher to"
                errorMessage={errors.holder}
              />
            </section>

            <section className={styles.voucher_update__image}>
              <Typography.Paragraph
                view={ParagraphView.small}
                color={ParagraphColor.gray}
                className={styles.voucher_update__image_title}
              >
                Voucher image
              </Typography.Paragraph>

              <div className={styles.voucher_update__image_img}>
                {!values.image ? (
                  <Typography.Paragraph
                    view={ParagraphView.small}
                    color={ParagraphColor.gray}
                  >
                    No image
                  </Typography.Paragraph>
                ) : (
                  <img src={values.image} alt="New voucher image" />
                )}
              </div>

              <section className={styles.voucher_update__image_buttons}>
                <FileInput
                  onFileUpload={onImageUpload}
                  buttonText="Upload photo"
                  errorMessage={errors.image}
                />

                <Button view={ButtonView.ghost} onClick={onDeleteImageClick}>
                  Delete current photo
                </Button>
              </section>
            </section>
          </Section>

          <Section className={styles.voucher_update__redeemed}>
            <Typography.Title
              view={TitleView.small}
              className={styles.voucher_update__redeemed_title}
            >
              Redeemable products
            </Typography.Title>

            <section className={styles.voucher_update__redeemed_content}>
              {values.redeemableProducts.length ? (
                <Table thead={['Product name', 'Product price']} tbody={[]} />
              ) : errors.redeemableProducts[0] ? (
                <Typography.Paragraph
                  view={ParagraphView.small}
                  color={ParagraphColor.red}
                >
                  Products are required!
                </Typography.Paragraph>
              ) : null}

              {values.redeemableProducts.map((product, index) => (
                <div
                  key={`${product.productName}-${index}`}
                  className={styles.voucher_update__redeemed_container}
                >
                  <div className={styles.voucher_update__redeemed_left}>
                    <Select
                      onChange={(option) => onRowNameChange(index, option)}
                      placeholder="Choose the product"
                      options={mockProducts.map((product) => ({
                        label: product.name,
                        value: product.id
                      }))}
                      value={{
                        label: values.redeemableProducts[index].productName,
                        value: values.redeemableProducts[index].productPrice
                      }}
                      errorMessage={errors.redeemableProducts[index]}
                    />
                  </div>
                  <div className={styles.voucher_update__redeemed_right}>
                    <NumberFormat
                      value={Number(product.productPrice) || 0}
                      displayType={'text'}
                      decimalScale={2}
                      fixedDecimalScale
                      thousandSeparator="."
                      decimalSeparator=","
                    />

                    <Button
                      view={ButtonView.transparent}
                      onClick={() => onDeleteRow(index)}
                    >
                      <CloseIcon width="11px" height="11px" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className={styles.voucher_update__redeemed_footer}>
                <Button
                  view={ButtonView.ghost}
                  LeftAddon={PlusIcon}
                  onClick={onAddRow}
                >
                  Add row
                </Button>
              </div>
            </section>
          </Section>
        </section>
      </section>
    );
  }
);

export default EditCreateVoucher;
