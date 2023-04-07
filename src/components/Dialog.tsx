import './Dialog.scss';

import ReactDOM, { createPortal } from 'react-dom';
import { ReactNode, createRef, useEffect, useId, useState } from 'react';

import { AnimationTools } from '../tools/AnimationTools';
import { BootstrapIcon } from './BootstrapIcon';
import { Button } from './Button';
import FocusLock from 'react-focus-lock';
import { useEventListener } from '../tools/events/Events';

export const findAndFocusDialogCallerElement = (
    dialogCallerElement: HTMLButtonElement | null,
    callback: () => void
) => {
    setTimeout(() => {
        if (dialogCallerElement !== null) {
            let dialogCallerElementOrigin =
                ReactDOM.findDOMNode(dialogCallerElement);

            if (dialogCallerElementOrigin instanceof HTMLButtonElement) {
                dialogCallerElementOrigin.focus();
            }

            if (callback) callback();
        }
    }, 1);
};

export interface IDialog {
    title?: string;
    icon?: string;
    active: boolean;
    errorText?: string;
    successText?: string;
    onClose?: () => void;
    children?: ReactNode[] | ReactNode | string;
    className?: string;
    id?: string;
    'aria-labeledby'?: string;
    'aria-busy'?: boolean;
    closeButtonTitle?: string;
    showCloseButton?: boolean;
}

export function Dialog({ showCloseButton = true, ...props }: IDialog) {
    const [isDetached, setIsDetached] = useState<boolean>(true);
    const [isHidden, setIsHidden] = useState<boolean>(true);

    const dialogRef = createRef<HTMLDivElement>();

    const [lastAnimationTimeout, setLastAnimationTimeout] =
        useState<NodeJS.Timeout | null>(null);

    const id = useId();

    useEffect(() => {
        if (lastAnimationTimeout) {
            clearTimeout(lastAnimationTimeout);
        }

        let timeout = AnimationTools.autoShowHideTransition(
            props.active,
            setIsDetached,
            setIsHidden
        );

        setLastAnimationTimeout(timeout);
    }, [props.active]);

    function close() {
        if (props.onClose) props.onClose();
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' && !isHidden) {
            close();
        }
    }

    function handleOnClick(e: React.MouseEvent<HTMLElement>) {
        let target = e.target as HTMLElement;

        if (
            target &&
            dialogRef.current !== null &&
            dialogRef.current === target
        ) {
            close();
        }
    }

    useEventListener('keydown', handleKeyDown);

    let rootNode = document.getElementById('root');

    if (!isDetached && rootNode) {
        return createPortal(
            <FocusLock autoFocus={false}>
                <div
                    role='dialog'
                    aria-busy={props['aria-busy']}
                    aria-modal={true}
                    className={
                        'dialog-window' +
                        (isHidden ? ' hidden' : '') +
                        (props.className ? ' ' + props.className : '')
                    }
                    onClick={(e) => handleOnClick(e)}
                    ref={dialogRef}
                    id={id}
                    aria-labelledby={
                        props['aria-labeledby']
                            ? props['aria-labeledby']
                            : id + '--title'
                    }
                >
                    <div className='dialog'>
                        <div className='dialog-header'>
                            {props.title && (
                                <h2 id={id + '--title'}>
                                    {props.icon && (
                                        <BootstrapIcon
                                            icon={props.icon}
                                            className='icon'
                                        />
                                    )}
                                    {props.title}
                                </h2>
                            )}

                            {showCloseButton && (
                                <Button
                                    aria-label={
                                        props.closeButtonTitle ?? 'Close'
                                    }
                                    title={props.closeButtonTitle ?? 'Close'}
                                    icon='x'
                                    rounded={true}
                                    primary={true}
                                    onClick={() => close()}
                                    danger={true}
                                    className={'close-button'}
                                />
                            )}
                        </div>
                        <div className='dialog-main'>{props.children}</div>
                    </div>
                </div>
            </FocusLock>,
            rootNode
        );
    } else {
        return null;
    }
}
