import {
  isEmail,
  isPhoneNumber,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class CustomValidId implements ValidatorConstraintInterface {
  validate(id: string) {
    return isEmail(id) || isPhoneNumber(id);
  }
}
