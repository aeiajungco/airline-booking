import { FormGroup } from "@angular/forms";

export function OrigDestValidator(controlName: any, comparedControlName: any) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const comparedControl = formGroup.controls[comparedControlName];
        if (comparedControl.errors && !comparedControl.errors.confirmedValidator) {
            return;
        }
        if (control.value === comparedControl.value) {
            comparedControl.setErrors({ confirmedValidator: true});
        }
        else {
            comparedControl.setErrors(null);
        }
    }
}