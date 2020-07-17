import * as React from 'react';

interface RgReactBaseModalAction {
    isDefaultCancel?: boolean;
    isDefault?: boolean;
    isDisabled?: boolean | (() => any);
    onClick?: () => any;
    title?: string;
}

interface RgReactBaseModalProps {
    show?: boolean;
    currentWidth?: number;
    currentHeight?: number;
    title?: string;
    titleCustom?: any;
    overflowVisible?: boolean;
    hideTitle?: boolean;
    closeCallback?: () => any;
    closeOnBackClick?: boolean;
    actions?: RgReactBaseModalAction[];
    parentClass?: string;
    fullScreen?: boolean;
}

export interface IModalStoreShowActionParams extends RgReactBaseModalAction {
    notCloseModal?: boolean;
}

export interface IModalStoreShowParams extends RgReactBaseModalProps {
    actions?: IModalStoreShowActionParams[];
    content?: (closeCallback: () => any) => false | JSX.Element;
}

export interface IModalStoreParams {
    index: number;
    params: IModalStoreShowParams;
}

export class RgReactBaseModal extends React.Component<RgReactBaseModalProps, any> {}

declare class ModalStore {
    modalParams: IModalStoreParams[];
    showModal: (params: IModalStoreShowParams) => number;
    closeModal: (index: number) => any;
}
declare const modalStore: ModalStore;

interface IModalStoreViewProps {
    modalStore?: ModalStore;
}

declare class ModalStoreView extends React.Component<IModalStoreViewProps, any> {
}

export {
    modalStore, ModalStore, ModalStoreView,
};
