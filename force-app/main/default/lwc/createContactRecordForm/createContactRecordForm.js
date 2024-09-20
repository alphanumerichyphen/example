import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Error_First_Name_Special_Character from '@salesforce/label/c.Error_First_Name_Special_Character';
import Error_Last_Name_Special_Character from '@salesforce/label/c.Error_Last_Name_Special_Character';
// import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
// import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
// import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class CreateContactRecordForm extends LightningElement {
    @api recordId;
    errors = [];

    //fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD];

    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        this.errors = [];
        this.validateName();
        this.validateEmail();

        if(this.errors.length > 0) {
            const evt = new ShowToastEvent({
                title: 'Error creating record',
                message: this.errors.join(', '),
                variant: 'error',
            });
            this.dispatchEvent(evt);
        }
        else {
            const fields = event.detail.fields;
            fields['AccountId'] = this.recordId;
    
            this.template.querySelector('lightning-record-edit-form').submit(fields);
            console.log('submitted successfully');
        }
    }

    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if(inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Contact created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }

    handleError(event) {
        const evt = new ShowToastEvent({
            title: 'Error creating record',
            message: event.detail.message,
            variant: 'error',
        });
        this.dispatchEvent(evt);
    }

    validateName() {
        const re = /[^A-Za-z ]/;
        const firstNameCmp = this.refs.firstname;
        const lastNameCmp = this.refs.lastname

        if(re.test(firstNameCmp.value)) {
            // firstNameCmp.setCustomValidity("Name cannot contain special characters");
            this.errors.push(Error_First_Name_Special_Character);
        }
        // else {
        //     firstNameCmp.setCustomValidity("");
        // }
        // firstNameCmp.reportValidity();

        if(re.test(lastNameCmp.value)) {
            // lastNameCmp.setCustomValidity("Name cannot contain special characters");
            this.errors.push(Error_Last_Name_Special_Character);
        }
        // else {
        //     lastNameCmp.setCustomValidity("");

        // }
        // lastNameCmp.reportValidity();
    }

    validateEmail() {
        const re = /.+@.+\.com/;
        const emailCmp = this.refs.email;

        if(!re.test(emailCmp.value)) {
            // emailCmp.setCustomValidity("Email pattern is not valid");
            this.errors.push('Email pattern is not valid');
        }
        // else {
        //     emailCmp.setCustomValidity("");
        // }
        // emailCmp.reportValidity();
    }
}

