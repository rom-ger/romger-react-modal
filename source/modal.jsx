import { FlexBox } from '@romger/react-flex-layout';
import React from 'react';
import classnames from 'classnames';

class RgReactBaseModal extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            show: false,
            multiple: false,
        };
    }

    get iconClose() {
        return <svg
            className={classnames(
                'modal-icon'
            )}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            enableBackground="new 0 0 24 24"
        >
            <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
            <path
                d="M0 0h24v24H0z"
                fill="none"
            />
        </svg>;
    }

    componentDidMount() {
        this.setState({
            show: this.props.show,
            multiple: this.checkMultiple(),
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            show: newProps.show,
            multiple: this.checkMultiple(newProps),
        });
    }

    /**
     * Проверяем, открыто ли ещё одно модальное окно
     */
    checkMultiple(newProps = null) {
        if ((!newProps && this.props.show && !this.state.show) || (!!newProps && newProps.show && !this.props.show)) {
            let backs = document.getElementsByClassName('rg-react-base-modal__back');
            return !!backs.length;
        }
        return this.state.multiple;
    }

    wrapperModal({ children }) {
        return <div>{children}</div>;
    }

    render() {
        return (
            !!this.state.show &&
            <div
                className={classnames(
                    'rg-react-base-modal',
                    {
                        [this.props.parentClass]: !!this.props.parentClass,
                    }
                )}
            >
                <FlexBox
                    row="center center"
                    className={classnames(
                        'rg-react-base-modal__back',
                        {
                            'rg-react-base-modal__back--pointer': !!this.props.closeOnBackClick,
                            'rg-react-base-modal__back--multiple': !!this.state.multiple,
                        }
                    )}
                    onClick={() => this.props.closeOnBackClick ? this.props.closeCallback() : null}
                />
                <FlexBox
                    column="start stretch"
                    className={classnames(
                        'rg-react-base-modal__modal', {
                            'rg-react-base-modal__modal--full-screen': !!this.props.fullScreen,
                        },
                    )}
                    style={{
                        width: this.props.currentWidth && !this.props.fullScreen ? (this.props.currentWidth + 'px') : 'auto',
                        height: this.props.currentHeight && !this.props.fullScreen ? (this.props.currentHeight + 'px') : 'auto',
                    }}
                >
                    {
                        !this.props.hideTitle &&
                        <FlexBox
                            row="start center"
                            className={classnames(
                                'rg-react-base-modal__modal-title',
                            )}
                        >
                            <FlexBox flex={true}>
                                {!!this.props.title && !this.props.titleCustom ? this.props.title : ''}
                                {!this.props.title && !!this.props.titleCustom ? this.props.titleCustom : ''}
                            </FlexBox>
                            <FlexBox
                                row="end center"
                                onClick={() => this.props.closeCallback ? this.props.closeCallback() : null}
                            >
                                {this.iconClose}
                            </FlexBox>
                        </FlexBox>
                    }
                    <FlexBox
                        flex={true}
                        className={classnames(
                            'rg-react-base-modal__content-wrap',
                            {
                                'ws-react-base-modal__content-wrap--overflow-visible': !!this.props.overflowVisible,
                            },
                        )}
                    >
                        {this.props.children}
                    </FlexBox>
                    {
                        !!this.props.actions && !!this.props.actions.length &&
                        <FlexBox
                            row="end center"
                            flexWrap={true}
                            className={classnames(
                                'rg-react-base-modal__button-wrap'
                            )}
                        >
                            {
                                this.props.actions.map((action, index) =>
                                    <div key={index}>
                                        {
                                            action.isDefaultCancel
                                                ?
                                                <div
                                                    className={classnames(
                                                        'rg-react-base-modal__button',
                                                        'rg-react-base-modal__button--default'
                                                    )}
                                                    onClick={() => this.props.closeCallback ? this.props.closeCallback() : null}
                                                >
                                                    Отмена
                                                </div>
                                                :
                                                <div
                                                    className={classnames(
                                                        'rg-react-base-modal__button',
                                                        {
                                                            'rg-react-base-modal__button--default': !!action.isDefault,
                                                            'rg-react-base-modal__button--disabled': !!action.isDisabled && !!action.isDisabled(),
                                                        }
                                                    )}
                                                    onClick={() => action.onClick && (!action.isDisabled || !!action.isDisabled && !action.isDisabled()) ? action.onClick() : null}
                                                >
                                                    {action.title}
                                                </div>
                                        }
                                    </div>
                                )
                            }
                        </FlexBox>
                    }
                </FlexBox>
            </div>
        );
    }
}

export default RgReactBaseModal;
