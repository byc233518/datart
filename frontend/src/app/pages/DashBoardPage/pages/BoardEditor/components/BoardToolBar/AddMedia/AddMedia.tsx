/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AppstoreAddOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Tooltip } from 'antd';
import { ToolbarButton } from 'app/components';
import useI18NPrefix from 'app/hooks/useI18NPrefix';
import { LightWidgetType } from 'app/pages/DashBoardPage/pages/Board/slice/types';
import { widgetToolKit } from 'app/pages/DashBoardPage/utils/widgetToolKit/widgetToolKit';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addWidgetsToEditBoard } from '../../../slice/thunk';
import { BoardToolBarContext } from '../context/BoardToolBarContext';

export const AddMedia: React.FC<{}> = () => {
  const t = useI18NPrefix(`viz.board.action`);
  const dispatch = useDispatch();
  const { boardId, boardType } = useContext(BoardToolBarContext);
  const onSelectMediaWidget = useCallback(
    ({ keyPath }) => {
      const [mediaType] = keyPath;
      const widget = widgetToolKit.media.create({
        dashboardId: boardId,
        boardType,
        type: mediaType,
      });
      dispatch(addWidgetsToEditBoard([widget]));
    },
    [boardId, boardType, dispatch],
  );
  type TinyWidgetItems = { name: string; icon: string; type: LightWidgetType };
  const mediaWidgetTypes: TinyWidgetItems[] = [
    {
      name: t('image'),
      icon: '',
      type: 'image',
    },
    {
      name: t('richText'),
      icon: '',
      type: 'richText',
    },
    {
      name: t('timer'),
      icon: '',
      type: 'timer',
    },
    {
      name: t('iframe'),
      icon: '',
      type: 'iframe',
    },
    {
      name: t('video'),
      icon: '',
      type: 'video',
    },
    {
      name: t('border'),
      icon: '',
      type: 'border',
    },
  ];
  const mediaWidgetItems = (
    <Menu onClick={onSelectMediaWidget}>
      {mediaWidgetTypes.map(({ name, icon, type }) => (
        <Menu.Item key={type}>{name}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown
      overlay={mediaWidgetItems}
      placement="bottomLeft"
      trigger={['click']}
    >
      <Tooltip title={t('media')}>
        <ToolbarButton icon={<AppstoreAddOutlined />} />
      </Tooltip>
    </Dropdown>
  );
};
