public with sharing class OpportunityController {
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getRelatedOpportunities(String accountId){
        try {
            String queryString = 'select id';
            for(Schema.FieldSetMember field : SobjectType.Opportunity.FieldSets.Show_Opportunities_Field_Set.getFields()) {
                queryString += ',' + field.getFieldPath();

            }
            queryString += ' from Opportunity where AccountId = :accountId';
            return Database.query(queryString);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(Cacheable=true)
    public static String getOpportunityFields() {
        Schema.DescribeSObjectResult sObj = Schema.getGlobalDescribe().get('Opportunity').getDescribe();
        Schema.FieldSet fieldSet = sObj.FieldSets.getMap().get('Show_Opportunities_Field_Set');
        return JSON.serialize(fieldSet.getFields());
    }
    // Type class
}