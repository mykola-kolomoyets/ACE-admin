/* eslint-disable no-unused-vars */
import { useState, ReactElement, useEffect, useMemo } from 'react';
import Style from 'style-it';
import classnames from 'classnames';

import Typography from '../typography';

import { Label } from '../../utils/types/common';
import { useWindowSize } from '../../utils/hooks/useWindowSize';
import { ParagraphView } from '../../utils/enums/typography';

import './tabs.scss';
import { TabProps } from './tab';

export type TabsProps = {
  selectedId: Label;
  onChange: (selectedId: string) => void;
  children: {
    props: {
      children: ReactElement<TabProps>[];
    };
  };
};

const Tabs = ({ selectedId, onChange, children }: TabsProps) => {
  const content = children.props.children;

  const [activeTab, setActiveTab] = useState(selectedId.value);

  const [activeTabOffset, setActiveTabOffset] = useState<number[]>([0, 0]);
  const [tabsOffset, setTabsOffset] = useState<number>(41);

  const { width } = useWindowSize();

  const tabsTitles = useMemo(
    () => content.map((child) => child.props.title),
    [content]
  );
  const tabsIds = content.map((child) => child.props.id);

  const onTabClick = (index: number) => {
    setActiveTab(tabsIds[index]);
    onChange((tabsIds as never)[index]);
  };

  const getActiveTabLeftPos = () => {
    return activeTabOffset[0] < tabsOffset
      ? 0
      : activeTabOffset[0] - tabsOffset;
  };

  const getActiveTabWidth = () => {
    if (activeTabOffset[0] < tabsOffset) {
      return activeTabOffset[1] - tabsOffset;
    }

    const tabsEl = document.querySelector('.tabs__container');
    if (tabsEl) {
      const { right } = tabsEl.getBoundingClientRect();

      if (activeTabOffset[1] > right) {
        return (
          activeTabOffset[1] - activeTabOffset[0] - (activeTabOffset[1] - right)
        );
      }
    }

    return activeTabOffset[1] - activeTabOffset[0];
  };

  const styles = `
  .tabs__titles + span::after {
    left: ${getActiveTabLeftPos()}px;
    width: ${getActiveTabWidth()}px;
    }
  `;

  const tabTitleClasses = (id: string) =>
    classnames('tabs__titles-item', {
      'tabs__titles-item-active': id === activeTab
    });

  useEffect(() => {
    const activeTitle = document.querySelector('.tabs__titles-item-active');

    if (!activeTitle) return;

    const { left, right } = activeTitle.getBoundingClientRect();

    setActiveTabOffset([left, right]);
  }, [activeTab, width, tabsTitles]);

  useEffect(() => {
    const tabsEl = document.querySelector('.tabs__container');
    const activeTitle = document.querySelector('.tabs__titles-item-active');

    if (tabsEl && activeTitle) {
      tabsEl.addEventListener('scroll', () => {
        const { left, right } = activeTitle.getBoundingClientRect();

        setActiveTabOffset([left, right]);
      });
    }
  }, [activeTab, tabsTitles]);

  useEffect(() => {
    const tabsEl = document.querySelector('.tabs__container');

    if (tabsEl) {
      const { left } = tabsEl.getBoundingClientRect();

      setTabsOffset(left);
    }
  }, [width]);

  return (
    <Style>
      {styles}
      <section className="tabs">
        <div className="tabs__container">
          <ol className="tabs__titles">
            {tabsTitles.map((title: string, index: number) => (
              <li
                key={title + index}
                className={tabTitleClasses(tabsIds[index])}
                onClick={() => onTabClick(index)}
              >
                <Typography.Paragraph
                  view={ParagraphView.small}
                  className="tab__title"
                >
                  {title}
                </Typography.Paragraph>
                <span className="tab__addons">
                  {!isNaN(Number(content[index].props?.rightAddons))
                    ? content[index].props?.rightAddons
                    : ''}
                </span>
              </li>
            ))}
          </ol>

          <span></span>
        </div>

        <section className="tabs__content">
          {content.find((child) => child.props.id === activeTab)}
        </section>
      </section>
    </Style>
  );
};

export default Tabs;
