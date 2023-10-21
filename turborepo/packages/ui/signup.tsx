import {
  Root,
  Field,
  Label,
  Message,
  Control,
  Submit,
} from "@radix-ui/react-form";
import "./styles.css";

export function Signup(): JSX.Element{
  return (
    <Root className="FormRoot">
      <Field className="FormField" name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Label className="FormLabel">Email</Label>
          <Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Message>
          <Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Message>
        </div>
        <Control asChild>
          <input className="Input" type="email" />
        </Control>
      </Field>
      <Field className="FormField" name="question">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Label className="FormLabel">Question</Label>
          <Message className="FormMessage" match="valueMissing">
            Please enter a question
          </Message>
        </div>
        <Control asChild>
          <textarea className="Textarea" required />
        </Control>
      </Field>
      <Submit asChild>
        <button className="Button" style={{ marginTop: 10 }}>
          Post question
        </button>
      </Submit>
    </Root>
  );
};