// import { getDefaultRegistry } from "@rjsf/core/lib/utils";
// import {
//   ArrayFieldTemplate,
//   HeadingField,
//   ReactFormulaField,
//   ReactSignatureCanvasField,
//   RawHTMLField,
//   ReactPhotoGalleryField,
//   ReactPlaceField,
//   ReactPlaceAutofillField,
//   ReactQRReaderField,
//   ReactScannerField,
//   ReactTreeSelectField,
//   CurrencyWidget,
//   PercentWidget,
//   ReactDatePickerWidget,
//   ReactDropZoneWidget,
//   ReactSelectWidget,
//   StatesWidget,
//   ReactInputTableWidget,
//   GridObjectFieldTemplate
// } from "../index";

// export const widgets = {
//     CurrencyWidget,
//     PercentWidget,
//     ReactDatePickerWidget,
//     ReactDropZoneWidget,
//     ReactSelectWidget,
//     StatesWidget,
//     ReactInputTableWidget,
//     GridObjectFieldTemplate
// };

// export const fields = {
//   HeadingField: HeadingField,
//   ReactFormulaField,
//   ReactSignatureCanvasField,
//   RawHTMLField,
//   ReactPhotoGalleryField,
//   ReactPlaceField,
//   ReactPlaceAutofillField,
//   ReactQRReaderField,
//   ReactScannerField,
//   ReactTreeSelectField,
//   GridObjectFieldTemplate
// }

// class RegistryFactory {
//   create() {
//     let registry = getDefaultRegistry();
//     registry.fields = Object.assign(registry.fields, fields);
//     registry.widgets = Object.assign(registry.widgets, widgets);
//     registry.ObjectFieldTemplate = GridObjectFieldTemplate;
//     registry.ArrayFieldTemplate = ArrayFieldTemplate;
//     registry.definitions = {
//       GridObjectFieldTemplate: GridObjectFieldTemplate
//     }
//     return registry;
//   }
// }

// export default new RegistryFactory();