import { LightningElement, api, wire, track } from 'lwc';
import getRelatedOpportunities from '@salesforce/apex/OpportunityController.getRelatedOpportunities';
import { CurrentPageReference } from 'lightning/navigation';
import getOpportunityFields from '@salesforce/apex/OpportunityController.getOpportunityFields';

export default class ShowOpportunities extends LightningElement {
    @api recordId;
    columns = [];
    oppList = [];
    columnList = [];

    currentPage = 1;
    maxPage = 1;
    recordsPerPage = 5;
    pagedData;

    @wire(CurrentPageReference)
    getStateParamenters(currentPageReference) {
        if(currentPageReference) {
            console.log('currentPageReference ', currentPageReference);
            this.recordId = currentPageReference.state.recordId;
        }
    }

    @wire(getOpportunityFields)
    wiredData({error, data}) {
        if(data) {
            this.columnList = JSON.parse(data);
            this.columnList.forEach(element => {
                this.columns = [...this.columns, {label: element.label, fieldName: element.fieldPath}];
            });
            // this.columns = this.cols;
        }
        else if(error) {
            console.log('error while fetching fields -------------> ', JSON.stringify(error));
            // console.error or ui
        }
    }

    connectedCallback() {
        getRelatedOpportunities({accountId: this.recordId})
        .then((result) => {
            if(result != null) {
                this.oppList = result;
                this.gotoPage(this.currentPage);
            }
        })
        .catch((error) => {
            console.log('error while fetching opportunities ------> ' + JSON.stringify(error))
        });
    }

    // On page change... validate
    gotoPage(pageNumber) {
        if(pageNumber > 0 && pageNumber <= this.maxPage) {
            this.currentPage = pageNumber;
        }
        this.gotoPage(this.currentPage);
    }

    // On next click
    handleButtonNext() {
        var nextPage = this.currentPage + 1;
        var maxPages =  this.getMaxPages();
        if(nextPage > 0 && nextPage <= maxPages) {
            this.gotoPage(nextPage);
        }
    }

    // On previous click
    handleButtonPrevious() {
        var nextPage = this.currentPage - 1;
        var maxPages =  this.getMaxPages();
        if(nextPage > 0 && nextPage <= maxPages) {
            this.gotoPage(nextPage);
        }
    }

    // How many pages of results?
    getMaxPages() {
        // There will always be 1 page, at least
        var result = 1;

        // Number of elements on sourceData
        var arrayLength;

        // Number of elements on sourceData divided by number of rows to display in table (can be a float value)
        var divideValue;    

        arrayLength = this.oppList.length;

        // Float value of number of pages in data table
        divideValue = arrayLength / this.recordsPerPage;

        // Round up to the next Integer value for the actual number of pages
        result = Math.ceil(divideValue); 

        this.maxPages = result;
        return result;
    }

    // Change page
    gotoPage(pageNumber) {

        //console.log('data ------------->', JSON.stringify(this.oppList));

        var recordStartPosition, recordEndPosition;
        var i, arrayElement;        // Loop helpers

        // Empty the data source used 
        this.pagedData = [];

        // Start the records at the page position
        recordStartPosition = this.recordsPerPage * (pageNumber - 1);

        // End the records at the record start position with an extra increment for the page size
        recordEndPosition = recordStartPosition + this.recordsPerPage;

        // Loop through the selected page of records
        for ( i = recordStartPosition; i < recordEndPosition; i++ ) {

            arrayElement = this.oppList[i];

            if(arrayElement) {

                // Add data element for the data to bind
                this.pagedData.push(arrayElement);
            }
        }

        // Set global current page to the new page
        this.currentPage = pageNumber;

    }
}