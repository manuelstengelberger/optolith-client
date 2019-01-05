import { pipe } from 'ramda';
import { ActivatableDependentL, isActivatableDependent } from '../../App/Models/ActiveEntries/ActivatableDependent';
import { ActivatableSkillDependentL } from '../../App/Models/ActiveEntries/ActivatableSkillDependent';
import { AttributeDependentL, isAttributeDependent } from '../../App/Models/ActiveEntries/AttributeDependent';
import { isSkillDependent, SkillDependentL } from '../../App/Models/ActiveEntries/SkillDependent';
import { join } from '../../Data/Function';
import { over, view } from '../../Data/Lens';
import { deleteAt, elemIndex, ListElement } from '../../Data/List';
import { fromMaybe, Maybe } from '../../Data/Maybe';
import { Record, RecordI } from '../../Data/Record';
import * as Data from '../../types/data';
import { getHeroStateItem, removeHeroStateItem, setHeroStateItem } from '../heroStateUtils';

type Deps<T extends Data.Dependent> = RecordI<T>['dependencies'];
type Dep<T extends Data.Dependent> = ListElement<Deps<T>>;

const removeDependency =
  (e: ListElement<RecordI<Data.Dependent>['dependencies']>) =>
  (obj: Data.Dependent): Data.Dependent => {
    if (isAttributeDependent (obj)) {
      return join (pipe (
                    view (AttributeDependentL.dependencies),
                    elemIndex (e as Data.SkillDependency),
                    fromMaybe (-1),
                    deleteAt,
                    over (AttributeDependentL.dependencies)
                  ))
                  (obj)
    }

    if (isActivatableDependent (obj)) {
      return join (pipe (
                    view (ActivatableDependentL.dependencies),
                    elemIndex (e as Data.ActivatableDependency),
                    fromMaybe (-1),
                    deleteAt,
                    over (ActivatableDependentL.dependencies)
                  ))
                  (obj)
    }

    if (isSkillDependent (obj)) {
      return join (pipe (
                    view (SkillDependentL.dependencies),
                    elemIndex (e as Data.SkillDependency),
                    fromMaybe (-1),
                    deleteAt,
                    over (SkillDependentL.dependencies)
                  ))
                  (obj)
    }

    return join (pipe (
                  view (ActivatableSkillDependentL.dependencies),
                  elemIndex (e as Data.ExtendedSkillDependency),
                  fromMaybe (-1),
                  deleteAt,
                  over (ActivatableSkillDependentL.dependencies)
                ))
                (obj)
  }

const adjustOrRemove =
  <T extends Data.Dependent>(isUnused: (entry: T) => boolean) =>
    (id: string) =>
      (entry: T): (state: Record<Data.HeroDependent>) => Maybe<Record<Data.HeroDependent>> => {
        console.log (isUnused, id, entry);

        return isUnused (entry)
          ? removeHeroStateItem (id)
          : setHeroStateItem (id) (entry);
      };

const getIncreasableCreator: <T extends Data.ExtendedSkillDependent>(id: string) =>
  (entry: T) =>
    (state: Record<Data.HeroDependent>) => Maybe<Record<Data.HeroDependent>> =
      R.ifElse (
        isActivatableSkillDependent,
        adjustOrRemove (UnusedEntryUtils.isActivatableDependentSkillUnused),
        adjustOrRemove (UnusedEntryUtils.isDependentSkillUnused)
      );

const removeDependencyCreator = <T extends Data.Dependent>(
  adjustOrRemoveFn: (id: string) =>
    (entry: T) =>
      (state: Record<Data.HeroDependent>) => Maybe<Record<Data.HeroDependent>>
) =>
  (id: string, value: Dep<T>) =>
    (state: Record<Data.HeroDependent>): Record<Data.HeroDependent> =>
      Maybe.fromMaybe (state) (
        getHeroStateItem<T> (id) (state)
          .fmap (R.pipe (
            removeDependency (value),
            adjustOrRemoveFn (id)
          ))
          .bind (fn => fn (state))
      );

export const removeAttributeDependency = removeDependencyCreator (
  adjustOrRemove (UnusedEntryUtils.isAttributeDependentUnused)
);

export const removeIncreasableDependency = removeDependencyCreator (getIncreasableCreator);

export const removeActivatableDependency = removeDependencyCreator (
  adjustOrRemove (UnusedEntryUtils.isActivatableDependentUnused)
);
