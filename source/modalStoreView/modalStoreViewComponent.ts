import { observer } from 'mobx-react';
import * as React from 'react';
import { ModalStore } from '../modalStore';
import modalStoreViewTemplate from './modalStoreViewTemplate';

export interface IModalStoreViewProps {
    modalStore?: ModalStore;
}

export interface IModalStoreView {
    props: IModalStoreViewProps;
}

@observer
export default class ModalStoreView extends React.Component<IModalStoreViewProps, {}> implements IModalStoreView {

    render(): false | JSX.Element {
        return modalStoreViewTemplate(this);
    }
}
