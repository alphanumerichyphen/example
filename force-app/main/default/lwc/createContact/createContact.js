import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import ACCOUNTID from '@salesforce/schema/Contact.AccountId';

export default class AccountCreator extends LightningElement {
    @api recordId; // when used in a record context, gets set to the record id

    firstname = '';
    lastname = '';
    email = '';

    firstnameChangeHandler(event) {
        this.firstname = event.target.value;
    }

    lastnameChangeHandler(event) {
        this.lastname = event.target.value;
    }

    emailChangeHandler(event) {
        this.email = event.target.value;
    }

    async handleSubmit() {

        const fields = {};
        fields[FIRST_NAME.fieldApiName] = this.firstname;
        fields[LAST_NAME.fieldApiName] = this.lastname;
        fields[EMAIL.fieldApiName] = this.email;
        fields[ACCOUNTID.fieldApiName] = this.recordId;
        const recordInput = {
            apiName: CONTACT_OBJECT.objectApiName,
            fields
        };

        try {
            
            const allValid = [
                ...this.template.querySelectorAll('lightning-input'),   // The spread (...) syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected
            ].reduce((validSoFar, inputCmp) => {    // The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);
            if (!allValid) {
                throw new Error('Please update the invalid form entries and try again.');
            }

            const contact = await createRecord(recordInput);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact created, with id: ' + contact.id,
                    variant: 'success'
                })
            );
            console.log("recordId: ", this.recordId);
        }
        catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.message,
                    variant: 'error'
                })
            );
        }
    }
}