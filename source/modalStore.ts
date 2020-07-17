import { action, observable } from 'mobx';
import { IModalStoreParams, IModalStoreShowActionParams, IModalStoreShowParams } from './index';

class ModalStore {
    @observable modalParams: IModalStoreParams[];

    constructor() {
        this.modalParams = [];
    }

    /**
     * Открыть модалку
     */
    @action('show modal')
    showModal = (params: IModalStoreShowParams): number => {
        let modalParams: IModalStoreParams[] = [...this.modalParams];
        let index: number = modalParams.length ? modalParams[modalParams.length - 1].index + 1 : 1;
        let closeCallback = () => {
            this.closeModal(index);
        };
        params.closeCallback = closeCallback;
        if (params.actions) {
            params.actions.forEach((oneAction: IModalStoreShowActionParams, i: number) => {
                if (oneAction.notCloseModal || !params.actions) {
                    return;
                }
                let originalOnClick: any = oneAction.onClick;
                params.actions[i].onClick = () => {
                    if (!originalOnClick) {
                        return this.closeModal(index);
                    }
                    let result: any = originalOnClick();
                    if (result && result.then) {
                        result.then(() => this.closeModal(index));
                    } else {
                        this.closeModal(index);
                    }
                };
            })
        }
        modalParams.push({
            params,
            index,
        });
        this.modalParams = modalParams;
        return index;
    }

    /**
     * Закрыть модалку
     */
    @action('close modal')
    closeModal = (index: number) => {
        let findIndex: number = this.modalParams.findIndex(el => el.index === index);
        if (findIndex === -1) {
            return;
        }
        this.modalParams.splice(findIndex, 1);
    }
}

const modalStore = new ModalStore();

export default modalStore;
export { ModalStore };
