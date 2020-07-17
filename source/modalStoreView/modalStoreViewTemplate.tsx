import * as React from 'react';
import { IModalStoreParams, RgReactBaseModal } from '../index';
import { IModalStoreView } from './modalStoreViewComponent';

const modalStoreViewTemplate = (context: IModalStoreView) => {
    return (
        <>
            {
                !!context.props.modalStore && !!context.props.modalStore.modalParams.length &&
                context.props.modalStore.modalParams.map((params: IModalStoreParams) =>
                    <RgReactBaseModal
                        key={params.index}
                        title={params.params.title}
                        actions={params.params.actions}
                        closeCallback={params.params.closeCallback}
                        show
                        currentWidth={params.params.currentWidth}
                        currentHeight={params.params.currentHeight}
                        titleCustom={params.params.titleCustom}
                        hideTitle={params.params.hideTitle}
                        closeOnBackClick={params.params.closeOnBackClick}
                        parentClass={params.params.parentClass}
                        fullScreen={params.params.fullScreen}
                    >
                        {
                            !!params.params.content &&
                            params.params.content(params.params.closeCallback ? params.params.closeCallback : () => null)
                        }
                    </RgReactBaseModal>,
                )
            }
        </>
    );
};

export default modalStoreViewTemplate;
