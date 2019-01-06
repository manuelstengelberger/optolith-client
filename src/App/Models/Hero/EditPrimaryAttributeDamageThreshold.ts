import { List } from "../../../Data/List";
import { Maybe, Nothing } from "../../../Data/Maybe";
import { fromDefault } from "../../../Data/Record";

export interface EditPrimaryAttributeDamageThreshold {
  primary: Maybe<string>
  threshold: string | List<string>
}

export const EditPrimaryAttributeDamageThreshold =
  fromDefault<EditPrimaryAttributeDamageThreshold> ({
    primary: Nothing,
    threshold: List.empty,
  })