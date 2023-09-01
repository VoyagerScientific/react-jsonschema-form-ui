# ReactSelect Widget

This widget allows the users to select from inputs to the form from lists, arrays, checkboxes, etc.  This allows you to configure the form to suit the client's needs.

## Note

Please note, you can see how the variables interact with the varialbes and settings on this form by using the website [here](https://rjsf-team.github.io/react-jsonschema-form/).

## Making modifications

You configure the form by making modifications to the JSON options in the UISchema.  Take for example the default form presented at the URL above.

```json
{
  "firstName": {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
    "ui:autocomplete": "family-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/)."
  },
  "lastName": {
    "ui:autocomplete": "given-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description": "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> "
  },
  "age": {
    "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "(earth year)"
  },
  "bio": {
    "ui:widget": "textarea"
  },
  "password": {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!"
  },
  "telephone": {
    "ui:options": {
      "inputType": "tel"
    }
  }
}
```
 
This block shows a form with fields for first name, last name, age, bio, password, and telephone number.  The form looks like this:  

![Form Output](Screenshot/default.png)

But what if we wanted to hide the first name, you can do that with a simple change to the JSON.  

```json
  "firstName": {
  	"ui:hidden": true,
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
    "ui:autocomplete": "family-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/)."
  },
```

By adding the *ui:hidden* flag to the JSON and setting it to **true** the firstName field no longer appears on the form.  Other useful flags are *ui:readonly* which will grey out a box on the form so that the user cannot edit the field.  *ui:disabled* is very similar to to *ui:readonly* in that the form box (and any child elements) are greyed out, but the user cannot select the text if it is disabled.  *ui:required* will mark the form as a required field before a user is allowed to complete the form.
  


## Further Reading

You can find additional information about the ReactSelect Widget by reading the docs at the link [here](https://react-jsonschema-form.readthedocs.io/en/v4.2.2/usage/widgets/).





