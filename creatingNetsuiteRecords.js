 var newRec = nlapiCreateRecord("customer");
   newRec.setFieldValue("companyname", "custTest1");
   newRec.setFieldValue("subsidiary", 1);
   newRec.setFieldValue('email','123@abc.com');
   nlapiSubmitRecord(newRec);

48969 - customerInternalId

var newRec = nlapiCreateRecord("inventoryitem");
newRec.setFieldValue("itemid",'beltssss');
newRec.setFieldValue("subsidiary", 1);
newRec.setFieldValue('custitem_item_category','9');
newRec.setFieldValue('taxschedule','1');
nlapiSubmitRecord(newRec);

5880 - inventoryInternalId

var newRec = nlapiCreateRecord("inventoryadjustment");

newRec.setFieldValue("subsidiary", 1);
newRec.setFieldValue('account',7);
newRec.setFieldValue('trandate','1/20/2022');

newRec.selectNewLineItem('inventory');
newRec.setCurrentLineItemValue('inventory', 'item', 5880);
newRec.setCurrentLineItemValue('inventory', 'newquantity', 10);
newRec.setCurrentLineItemValue('inventory', 'location', 1);
newRec.setCurrentLineItemValue('inventory', 'adjustqtyby', 5);
newRec.commitLineItem('inventory');

nlapiSubmitRecord(newRec);



var inventory_record = nlapiCreateRecord('inventoryadjustment');

inventory_record.setFieldValue("subsidiary", 1);
inventory_record.setFieldValue('account',7);
inventory_record.setFieldValue('trandate','1/20/2022');

inventory_record.selectNewLineItem('inventory');
inventory_record.setCurrentLineItemValue('inventory', 'item', 5880);
inventory_record.setCurrentLineItemValue('inventory', 'location', 1);
inventory_record.setCurrentLineItemValue('inventory', 'adjustqtyby', 5);
inventory_record.commitLineItem('inventory');
nlapiSubmitRecord(inventory_record);

var inventoryDetail = inventory_record.createCurrentLineItemSubrecord('inventory', 'inventorydetail');
inventoryDetail.selectLineItem('inventoryassignment');
inventoryDetail.setCurrentLineItemValue('inventoryassignment', 'quantity', 10);
inventoryDetail.commitLineItem('inventoryassignment');
inventoryDetail.commit();
inventory_record.commitLineItem('inventory');
nlapiSubmitRecord(inventory_record);



var salesOrder = nlapiCreateRecord( 'salesorder');
salesOrder.setFieldValue( 'entity', 48969);
salesOrder.setFieldValue('custbody_end_user',48969)
salesOrder.setFieldValue('custbody_order_type','1')
salesOrder.selectNewLineItem('item');
salesOrder.setCurrentLineItemValue('item', 'item', 5881);
salesOrder.setCurrentLineItemValue('item', 'quantity', 2);
salesOrder.setCurrentLineItemValue('item', 'rate', 20);
salesOrder.commitLineItem('item');
nlapiSubmitRecord(salesOrder)

var ifRec = nlapiTransformRecord('salesorder', 6199, 'itemfulfillment'); 
ifRec.selectLineItem('item', 1);
ifRec.setCurrentLineItemValue('item', 'location', 1);
var ifDetail = ifRec.createCurrentLineItemSubrecord('item', 'inventorydetail');
ifDetail.selectNewLineItem('inventoryassignment');
ifDetail.setCurrentLineItemValue('inventoryassignment', 'issueinventorynumber', 5); 
ifDetail.setCurrentLineItemValue('inventoryassignment', 'binnumber', 1); 
ifDetail.setCurrentLineItemValue('inventoryassignment', 'quantity', 5);
ifDetail.commitLineItem('inventoryassignment');
ifDetail.commit();
ifRec.commitLineItem('item');
var ifID = nlapiSubmitRecord(ifRec);


var inv1 = nlapiCreateRecord( 'invoice');
inv1.setFieldValue( 'entity', 42190);
inv1.setFieldValue( 'custbody_end_user', 42190); 
inv1.setFieldValue( 'class', 1);
inv1.setFieldValue( 'location', 1);
inv1.setFieldValue( 'custbody_order_type', 1);
inv1.selectNewLineItem('item');
inv1.setCurrentLineItemValue('item', 'item', 5875); 
inv1.setCurrentLineItemValue('item', 'quantity', 5);
inv1.commitLineItem('item');
var inv1Id = nlapiSubmitRecord(inv1, true);
