import { FormEvent, ReactNode } from 'react';

export interface IAsyncForm {
    className?: string;
    children?: ReactNode | ReactNode[];
    noValidate?: boolean;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

export function AsyncForm(props: IAsyncForm) {
    function findAndFocusFirstInvalidElement(form: HTMLFormElement) {
        let firstInvalidElement = form.querySelector('[aria-invalid=true]');

        if (
            firstInvalidElement instanceof HTMLInputElement ||
            firstInvalidElement instanceof HTMLSelectElement ||
            firstInvalidElement instanceof HTMLTextAreaElement
        ) {
            firstInvalidElement.focus();
        }
    }

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let form = e.target as HTMLFormElement;

        setTimeout(() => {
            findAndFocusFirstInvalidElement(form);

            setTimeout(() => {
                findAndFocusFirstInvalidElement(form);
            }, 350);
        }, 100);

        if (props.onSubmit) props.onSubmit(e);
    }

    return (
        <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleFormSubmit(e)}
            className={props.className}
            noValidate={props.noValidate}
        >
            {props.children &&
                ((props.children instanceof Array &&
                    props.children?.map((child) => {
                        return child;
                    })) ||
                    props.children)}
        </form>
    );
}
