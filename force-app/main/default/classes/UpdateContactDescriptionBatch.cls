public class UpdateContactDescriptionBatch implements Database.Batchable<sObject> {

    public List<Account> accId;

    public  UpdateContactDescriptionBatch(List<Account> accIds){
        this.accId = accIds;
    }

    // All the methods in the Database.Batchable interface require a reference to a Database.BatchableContext object.
    // Use this object to track the progress of the batch job.

    public Database.QueryLocator start(Database.BatchableContext bc) {
        // collect the batches of records or objects to be passed to execute
        return Database.getQueryLocator('SElECT Id, Description, AccountId from Contact where AccountId in :accId');
    }

    public void execute(Database.BatchableContext bc, List<Contact> contacts) {
        // process each batch of records
        List<Contact> contactsToUpdate = new List<Contact>();
        for(Contact con: contacts) {
            con.Description = 'Description is updated from Batch!'; // remove hardcoding
            contactsToUpdate.add(con);
        }
        if(!contactsToUpdate.isEmpty() && contactsToUpdate.size() > 0) {
            update contactsToUpdate;
        }
    }

    public void finish(Database.BatchableContext bc) {
        // execute any post-processing operations
    }
}