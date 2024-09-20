trigger UpdateContactFromBatch on Account (after update) {
        // List<Id> accIds = new List<Id>();
        // for(Account account : Trigger.new)
        // {
        //     accIds.add(account.Id);
        // }
        // ucdb.accIds = accIds;
        UpdateContactDescriptionBatch ucdb = new UpdateContactDescriptionBatch(Trigger.new);
        Id batchId = Database.executeBatch(ucdb, 1000);
}