import CurrencyWidget from '../src/widgets/CurrencyWidget';
import PercentWidget from '../src/widgets/PercentWidget';
import RawHTMLField from '../src/fields/RawHTMLField';
import ReactSignatureCanvasField from '../src/fields/ReactSignatureCanvasField';
import ReactDatePickerWidget from './../src/widgets/ReactDatePickerWidget';
import ReactSelectWidget from './../src/widgets/ReactSelectWidget';

export const WIDGET_MAP = {
  CurrencyWidget,
  PercentWidget,
  ReactDatePickerWidget,
  ReactSelectWidget,
};

export const FIELD_MAP = {
  RawHTMLField,
  ReactSignatureCanvasField,
};

export const READONLY_SCHEMA = {
  type: "object",
  required: [],
  readOnly: true,
};