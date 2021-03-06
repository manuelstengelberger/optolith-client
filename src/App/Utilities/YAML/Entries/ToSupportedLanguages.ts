/* eslint "@typescript-eslint/type-annotation-spacing": [2, { "before": true, "after": true }] */
import { Either, second } from "../../../../Data/Either"
import { fromMap, OrderedMap } from "../../../../Data/OrderedMap"
import { Record } from "../../../../Data/Record"
import { Locale } from "../../../Models/Locale"
import { pipe } from "../../pipe"
import { map } from "../Array"
import { toMapIntegrity } from "../EntityIntegrity"
import { SupportedLanguage, SupportedLanguages } from "../Schema/SupportedLanguages"


const toLang : (x : SupportedLanguage) => [string, Record<Locale>]
             = x => [ x.id, Locale (x) ]


export const toSupportedLanguages : (langs : SupportedLanguages)
                                  => Either<Error[], OrderedMap<string, Record<Locale>>>
                                  = pipe (
                                      map (toLang),
                                      toMapIntegrity,
                                      second (fromMap)
                                    )
