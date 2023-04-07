export class ValidationTools {
    static getCountOfDigits(source: string): number {
        return source.replace(/[^0-9]/g, '').length;
    }

    static getCountOfLetters(source: string): number {
        return source.replace(/[^A-Za-z]/g, '').length;
    }

    static isEmailValid(email: string): boolean {
        return /^[\w-.+üÜäÄöÖß]+@([\w-üÜäÄöÖß]+\.)+[\w-üÜäÄöÖß]{2,20}$/.test(
            email
        );
    }

    static isEmailFieldValueValid(value: string, isFormSended: boolean = true) {
        return (
            (!isFormSended && value.length === 0) || this.isEmailValid(value)
        );
    }

    static isRequiredFieldValueValid(
        value: string | null | undefined,
        isFormSended: boolean = true
    ) {
        return (
            (!isFormSended && [0, undefined, null].includes(value?.length)) ||
            (value?.length || 0) > 0
        );
    }

    static hasValidMaxLength(
        value: string | null | undefined,
        isFormSended: boolean = true,
        maxLength: number = 200
    ): boolean {
        return (
            (!isFormSended && value?.length === 0) ||
            (value?.length || 0) <= maxLength
        );
    }

    static mod97(iban: string) {
        var remainder = iban,
            block: string | any[];

        while (remainder.length > 2) {
            block = remainder.slice(0, 9);
            remainder =
                (parseInt(block, 10) % 97) + remainder.slice(block.length);
        }

        return parseInt(remainder, 10) % 97;
    }

    static iso13616Prepare(iban: string) {
        let A = 'A'.charCodeAt(0),
            Z = 'Z'.charCodeAt(0);

        iban = iban.toUpperCase();
        iban = iban.substring(4) + iban.substring(0, 4);

        return iban
            .split('')
            .map(function (n) {
                var code = n.charCodeAt(0);
                if (code >= A && code <= Z) {
                    // A = 10, B = 11, ... Z = 35
                    return code - A + 10;
                } else {
                    return n;
                }
            })
            .join('');
    }

    static isIBANValid(iban: string): boolean {
        if (iban.length < 2) {
            return false;
        }

        iban = iban.toUpperCase().replace(/[^A-Z0-9]/g, '');

        let digits: string = this.iso13616Prepare(iban);

        if (this.mod97(digits) == 1) {
            return true;
        }

        return false;
    }
}
