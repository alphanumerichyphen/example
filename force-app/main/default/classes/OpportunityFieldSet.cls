public with sharing class OpportunityFieldSet {

    // @AuraEnabled(Cacheable=true)
    // public static List<Opportunity> getOpportunities(){
    //     try {
    //         String queryString = 'select id';
    //         for(Schema.FieldSetMember field : SobjectType.Opportunity.FieldSets.Show_Opportunities_Field_Set.getFields()) {
    //             queryString += ',' + field.getFieldPath();

    //         }
    //         queryString += ' from Opportunity where AccountId = :recordId';
    //         return Database.query(queryString);
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    // @AuraEnabled(Cacheable=true)
    // public static string getLabelAndAPI(){
    //     List<Map<String, String>> listOfFieldSet = new List<Map<String, String>>();
    //     try {
    //         for(Schema.FieldSetMember field : SobjectType.Opportunity.FieldSets.Show_Opportunities_Field_Set.getFields()) {
    //             Map<String, String> labelAPIMap = new Map<String, String>();
    //             labelAPIMap.put(field.getLabel(), field.getFieldPath());
    //             listOfFieldSet.add(labelAPIMap);
    //         }
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }

    //     return JSON.serialize(listOfFieldSet);
    // }
}