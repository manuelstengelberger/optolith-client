type singleWithId = {
  id: int,
  options: list(Hero.Activatable.option),
  level: Maybe.t(int),
  customCost: Maybe.t(int),
};

let isActive = (x: Hero.Activatable.t) => ListH.Extra.notNull(x.active);

let isActiveM = Maybe.maybe(false, isActive);

module Convert = {
  open Maybe;

  let heroEntryToSingles = (x: Hero.Activatable.t) =>
    x.active
    |> ListH.map((s: Hero.Activatable.single) =>
         {
           id: x.id,
           options: s.options,
           level: s.level,
           customCost: s.customCost,
         }
       );
  /* /**
    * Converts the object generated by the list item to an object that can be
    * inserted into an array of ActiveObjects.
    * @param obj The entry for which you want to convert the object.
    * @param activate The object generated by the list item.
    */
   export const convertUIStateToActiveObject =
     (activate: Record<ActivatableActivationOptions>): Record<ActiveObject> => {
       const id = AAOA.id (activate)
       const selectOptionId1 = AAOA.selectOptionId1 (activate)
       const selectOptionId2 = AAOA.selectOptionId2 (activate)
       const selectOptionId3 = AAOA.selectOptionId3 (activate)
       const input = AAOA.input (activate)
       const level = AAOA.level (activate)
       const customCost = AAOA.customCost (activate)

       return id === AdvantageId.HatredOf
         ? ActiveObject ({
             sid: selectOptionId1,
             sid2: input,
             cost: customCost,
           })
         : id === DisadvantageId.PersonalityFlaw
         ? ActiveObject ({
             sid: selectOptionId1,
             sid2: or (fmap (elemF (List<number | string> (7, 8)))
                           (selectOptionId1))
               ? input
               : Nothing,
             cost: customCost,
           })
         : id === SpecialAbilityId.SkillSpecialization
         ? ActiveObject ({
             sid: selectOptionId1,
             sid2: alt<number | string> (input)
                                       (selectOptionId2),
             cost: customCost,
           })
         : isJust (input) && isJust (selectOptionId1)
         ? ActiveObject ({
             sid: selectOptionId1,
             sid2: input,
             sid3: selectOptionId2,
             tier: level,
             cost: customCost,
           })
         : ActiveObject ({
             sid: alt<number | string> (input)
                                       (selectOptionId1),
             sid2: then (guard (isJust (input) || isJust (selectOptionId1)))
                       (selectOptionId2),
             sid3: selectOptionId3,
             tier: level,
             cost: customCost,
           })
     } */
  /* /**
    * Generates a list of ActiveObjects based on the given instance.
    */
   export const convertActivatableToArray =
     (x: Record<ActivatableDependent>) =>
       pipe_ (
               x,
               ADA.active,
               imap (index => toActiveObjectWithId (index) (ADA.id (x)))
             ) */
  /* /**
    * Get all active items in an array.
    * @param state A state slice.
    */
   export const getActiveFromState =
     foldr (pipe (convertActivatableToArray, append)) (empty)

   export interface ActiveObjectAny extends ActiveObject {
     [key: string]: any
   } */

  let activatableOptionToSelectOptionId =
      (id: Hero.Activatable.option): maybe(Ids.selectOptionId) =>
    switch (id) {
    | `Generic(_) as id
    | `Skill(_) as id
    | `CombatTechnique(_) as id
    | `Spell(_) as id
    | `Cantrip(_) as id
    | `LiturgicalChant(_) as id
    | `Blessing(_) as id => Just(id)
    | `CustomInput(_) => Nothing
    };
};

module Accessors = {
  open Static;

  let name = x =>
    switch (x) {
    | Advantage(y) => y.name
    | Disadvantage(y) => y.name
    | SpecialAbility(y) => y.name
    };

  let selectOptions = x =>
    switch (x) {
    | Advantage(y) => y.selectOptions
    | Disadvantage(y) => y.selectOptions
    | SpecialAbility(y) => y.selectOptions
    };

  let input = x =>
    switch (x) {
    | Advantage(y) => y.input
    | Disadvantage(y) => y.input
    | SpecialAbility(y) => y.input
    };

  let apValue = x =>
    switch (x) {
    | Advantage(y) => y.apValue
    | Disadvantage(y) => y.apValue
    | SpecialAbility(y) => y.apValue
    };
};

module SelectOptions = {
  open Static.SelectOption;
  open Maybe;
  open Maybe.Functor;
  open Maybe.Monad;

  let getSelectOption = (x, id) =>
    id
    |> Convert.activatableOptionToSelectOptionId
    >>= Function.flip(SelectOptionMap.lookup, Accessors.selectOptions(x));

  /**
   * Get a selection option's name with the given id from given wiki entry.
   * Returns `Nothing` if not found.
   */
  let getSelectOptionName = (x, id) =>
    id |> getSelectOption(x) <&> (y => y.name);

  /**
   * Get a selection option's cost with the given id from given wiki entry.
   * Returns `Nothing` if not found.
   */
  let getSelectOptionCost = (x, id) =>
    id |> getSelectOption(x) >>= (y => y.cost);

  /**
   * Get all first select option IDs from the given entry.
   */
  let getActiveSelections = (x: Hero.Activatable.t) =>
    x.active
    |> mapMaybe((y: Hero.Activatable.single) => y.options |> listToMaybe);
  // type SecondarySelections = OrderedMap<number | string, List<string | number>>
  //
  // /**
  //  * Get all `ActiveObject.sid2` values from the given instance, sorted by
  //  * `ActiveObject.sid` in Map.
  //  * @param entry
  //  */
  // export const getActiveSecondarySelections =
  //   fmap (pipe (
  //               ADA.active,
  //               foldl ((map: SecondarySelections) => (selection: Record<ActiveObject>) =>
  //                       fromMaybe (map)
  //                                 (liftM2<string | number, string | number, SecondarySelections>
  //                                   (id => id2 => alter<List<string | number>>
  //                                     (pipe (
  //                                       fmap (consF (id2)),
  //                                       altF (Just (List (id2)))
  //                                     ))
  //                                     (id)
  //                                     (map))
  //                                   (AOA.sid (selection))
  //                                   (AOA.sid2 (selection))))
  //                     (OrderedMap.empty)
  //             ))
  //
  // /**
  //  * Get all `DependencyObject.sid` values from the given instance.
  //  * @param obj The entry.
  //  */
  // export const getRequiredSelections:
  //   (m: Maybe<Record<ActivatableDependent>>) => Maybe<List<string | number | List<number>>> =
  //     fmap (pipe (
  //       ADA.dependencies,
  //       mapMaybe<ActivatableDependency, string | number | List<number>> (pipe (
  //         ensure (isRecord),
  //         bindF (DependencyObject.A.sid)
  //       ))
  //     ))
};

let getOption1 = heroEntry => heroEntry.options |> Maybe.listToMaybe;
let getOption2 = heroEntry => ListH.(heroEntry.options <!!> 1);
let getOption3 = heroEntry => ListH.(heroEntry.options <!!> 2);

let getCustomInput = (option: Hero.Activatable.option) =>
  switch (option) {
  | `CustomInput(x) => Maybe.Just(x)
  | `Generic(_)
  | `Skill(_)
  | `CombatTechnique(_)
  | `Spell(_)
  | `LiturgicalChant(_)
  | `Cantrip(_)
  | `Blessing(_) => Nothing
  };

let getGenericId = (option: Hero.Activatable.option) =>
  switch (option) {
  | `Generic(x) => Maybe.Just(x)
  | `Skill(_)
  | `CombatTechnique(_)
  | `Spell(_)
  | `LiturgicalChant(_)
  | `Cantrip(_)
  | `Blessing(_)
  | `CustomInput(_) => Nothing
  };

let lookupMap = (k, mp, f) => Maybe.Functor.(f <$> IntMap.lookup(k, mp));

let getSkillFromOption =
    (staticData: Static.t, option: Hero.Activatable.option) =>
  switch (option) {
  | `Skill(id) => IntMap.lookup(id, staticData.skills)
  | `Generic(_)
  | `CombatTechnique(_)
  | `Spell(_)
  | `LiturgicalChant(_)
  | `Cantrip(_)
  | `Blessing(_)
  | `CustomInput(_) => Nothing
  };

module Names = {
  open Maybe;
  open Maybe.Functor;
  open Maybe.Monad;
  open Static;
  open Function;

  let getDefaultNameAddition = (staticEntry, heroEntry) => {
    let input = Accessors.input(staticEntry);
    let selectOptions = Accessors.selectOptions(staticEntry);

    let sid = heroEntry |> getOption1;
    let sid2 = heroEntry |> getOption2;

    switch (input, sid, sid2) {
    // Text input
    | (Just(_), Just(`CustomInput(str)), Nothing) => Just(str)
    // Select option and text input
    | (
        Just(_),
        Just(
          `Generic(_) as id | `Skill(_) as id | `CombatTechnique(_) as id |
          `Spell(_) as id |
          `LiturgicalChant(_) as id |
          `Cantrip(_) as id |
          `Blessing(_) as id,
        ),
        Just(`CustomInput(str)),
      )
        when SelectOption.SelectOptionMap.size(selectOptions) > 0 =>
      Just(
        (
          id
          |> SelectOptions.getSelectOptionName(staticEntry)
          |> fromMaybe("")
        )
        ++ ": "
        ++ str,
      )
    // Plain select option
    | (
        Nothing,
        Just(
          `Generic(_) as id | `Skill(_) as id | `CombatTechnique(_) as id |
          `Spell(_) as id |
          `LiturgicalChant(_) as id |
          `Cantrip(_) as id |
          `Blessing(_) as id,
        ),
        Nothing,
      ) =>
      SelectOptions.getSelectOptionName(staticEntry, id)
    | _ => Nothing
    };
  };

  /**
   * A lot of entries have customization options: Text input, select option or
   * both. This function creates a string that can be appended to the `name`
   * property of the respective record to create the full active name.
   */
  let getEntrySpecificNameAddition = (staticData, staticEntry, heroEntry) =>
    switch (staticEntry) {
    | Advantage(entry) =>
      switch (Ids.AdvantageId.fromInt(entry.id)) {
      | Aptitude
      | ExceptionalSkill =>
        heroEntry
        |> getOption1
        >>= (
          sid =>
            switch (sid) {
            | `Skill(id) => lookupMap(id, staticData.skills, x => x.name)
            | `Spell(id) => lookupMap(id, staticData.spells, x => x.name)
            | `LiturgicalChant(id) =>
              lookupMap(id, staticData.liturgicalChants, x => x.name)
            | `Generic(_)
            | `CombatTechnique(_)
            | `Cantrip(_)
            | `Blessing(_)
            | `CustomInput(_) => Nothing
            }
        )
      | ExceptionalCombatTechnique
      | WeaponAptitude =>
        heroEntry
        |> getOption1
        >>= (
          sid =>
            switch (sid) {
            | `CombatTechnique(id) =>
              lookupMap(id, staticData.combatTechniques, x => x.name)
            | `Generic(_)
            | `Skill(_)
            | `Spell(_)
            | `LiturgicalChant(_)
            | `Cantrip(_)
            | `Blessing(_)
            | `CustomInput(_) => Nothing
            }
        )
      | HatredFor =>
        heroEntry
        |> getOption1
        >>= SelectOptions.getSelectOption(staticEntry)
        |> liftM2(
             (type_, frequency: Static.SelectOption.t) =>
               type_ ++ " (" ++ frequency.name ++ ")",
             getOption2(heroEntry) >>= getCustomInput,
           )
      | _ => getDefaultNameAddition(staticEntry, heroEntry)
      }
    | Disadvantage(entry) =>
      switch (Ids.DisadvantageId.fromInt(entry.id)) {
      | Incompetent =>
        heroEntry
        |> getOption1
        >>= getSkillFromOption(staticData)
        <&> (x => x.name)
      | PersonalityFlaw =>
        heroEntry
        |> getOption1
        >>= SelectOptions.getSelectOption(staticEntry)
        <&> (
          option1 =>
            (
              switch (option1.id) {
              // Get the input if Prejudice or Unworldly is selected
              | `Generic(7 | 8) => heroEntry |> getOption2 >>= getCustomInput
              // Otherwise ignore any additional options
              | `Generic(_)
              | `Skill(_)
              | `CombatTechnique(_)
              | `Spell(_)
              | `LiturgicalChant(_)
              | `Cantrip(_)
              | `Blessing(_) => Nothing
              }
            )
            |> maybe(option1.name, specialInput =>
                 option1.name ++ ": " ++ specialInput
               )
        )
      | _ => getDefaultNameAddition(staticEntry, heroEntry)
      }
    | SpecialAbility(entry) =>
      switch (Ids.SpecialAbilityId.fromInt(entry.id)) {
      | AdaptionZauber
      | FavoriteSpellwork =>
        heroEntry
        |> getOption1
        >>= (
          sid =>
            switch (sid) {
            | `Spell(id) => lookupMap(id, staticData.spells, x => x.name)
            | `Generic(_)
            | `Skill(_)
            | `CombatTechnique(_)
            | `LiturgicalChant(_)
            | `Cantrip(_)
            | `Blessing(_)
            | `CustomInput(_) => Nothing
            }
        )
      | TraditionSavant
      | Forschungsgebiet
      | Expertenwissen
      | Wissensdurst
      | Recherchegespuer =>
        heroEntry
        |> getOption1
        >>= getSkillFromOption(staticData)
        <&> (x => x.name)
      | Lieblingsliturgie =>
        heroEntry
        |> getOption1
        >>= (
          sid =>
            switch (sid) {
            | `LiturgicalChant(id) =>
              lookupMap(id, staticData.liturgicalChants, x => x.name)
            | `Generic(_)
            | `Skill(_)
            | `CombatTechnique(_)
            | `Spell(_)
            | `Cantrip(_)
            | `Blessing(_)
            | `CustomInput(_) => Nothing
            }
        )
      | SkillSpecialization =>
        heroEntry
        |> getOption1
        >>= getSkillFromOption(staticData)
        >>= (
          skill =>
            heroEntry
            |> getOption2
            >>= (
              option2 =>
                (
                  switch (option2) {
                  // If input string use input
                  | `CustomInput(x) => Just(x)
                  // Otherwise lookup application name
                  | `Generic(id) =>
                    skill.applications
                    |> IntMap.Foldable.find((a: Skill.application) =>
                         a.id === id
                       )
                    <&> (a => a.name)
                  | `Skill(_)
                  | `CombatTechnique(_)
                  | `Spell(_)
                  | `LiturgicalChant(_)
                  | `Cantrip(_)
                  | `Blessing(_) => Nothing
                  }
                )
                // Merge skill name and application name
                <&> (appName => skill.name ++ ": " ++ appName)
            )
        )
      | Exorzist =>
        switch (heroEntry.level) {
        | Just(1) =>
          heroEntry
          |> getOption1
          >>= SelectOptions.getSelectOptionName(staticEntry)
        | _ => Nothing
        }
      | SpellEnhancement as entryId
      | ChantEnhancement as entryId =>
        heroEntry
        |> getOption1
        >>= SelectOptions.getSelectOption(staticEntry)
        >>= (
          enhancement =>
            enhancement.target
            >>= (
              id =>
                (
                  switch (entryId) {
                  | SpellEnhancement =>
                    IntMap.lookup(id, staticData.spells) <&> (x => x.name)
                  | _ =>
                    IntMap.lookup(id, staticData.liturgicalChants)
                    <&> (x => x.name)
                  }
                )
                <&> (targetName => targetName ++ ": " ++ enhancement.name)
            )
        )
      | TraditionArcaneBard =>
        heroEntry
        |> getOption1
        >>= getGenericId
        >>= flip(IntMap.lookup, staticData.arcaneBardTraditions)
      | TraditionArcaneDancer =>
        heroEntry
        |> getOption1
        >>= getGenericId
        >>= flip(IntMap.lookup, staticData.arcaneDancerTraditions)
      | LanguageSpecializations =>
        liftM2(
          SelectOptions.getSelectOption,
          IntMap.lookup(
            Ids.SpecialAbilityId.toInt(Language),
            staticData.specialAbilities,
          )
          <&> (specialAbility => SpecialAbility(specialAbility)),
          getOption1(heroEntry),
        )
        |> join
        >>= (
          language =>
            heroEntry
            |> getOption2
            >>= (
              option2 =>
                (
                  switch (option2) {
                  | `CustomInput(str) => Just(str)
                  | `Generic(specializationId) =>
                    language.specializations
                    >>= (
                      specializations =>
                        ListH.(specializations <!!> specializationId - 1)
                    )
                  | `Skill(_)
                  | `CombatTechnique(_)
                  | `Spell(_)
                  | `LiturgicalChant(_)
                  | `Cantrip(_)
                  | `Blessing(_) => Nothing
                  }
                )
                <&> (specialization => language.name ++ ": " ++ specialization)
            )
        )
      | Fachwissen =>
        heroEntry
        |> getOption1
        >>= getSkillFromOption(staticData)
        >>= (
          skill => {
            let applications =
              skill.applications
              |> IntMap.filter((app: Skill.application) =>
                   app.prerequisite |> isNothing
                 );

            [heroEntry |> getOption2, heroEntry |> getOption3]
            |> mapMaybe(option =>
                 option
                 >>= getGenericId
                 >>= (
                   opt =>
                     applications
                     |> IntMap.Foldable.find((app: Skill.application) =>
                          app.id === opt
                        )
                     <&> (app => app.name)
                 )
               )
            |> ensure(apps => apps |> ListH.Foldable.length |> (===)(2))
            <&> (
              apps =>
                apps
                |> AdvancedFiltering.sortStrings(staticData)
                |> Intl.ListFormat.format(Conjunction, staticData)
                |> (appsStr => skill.name ++ ": " ++ appsStr)
            );
          }
        )
      | _ => getDefaultNameAddition(staticEntry, heroEntry)
      }
    };

  /**
   * Some entries cannot use the default `name` property from wiki entries. The
   * value returned by may not use the default `name` property. For all entries
   * that do not need to handle a specific display format, the default `name`
   * property is used.
   */
  let getEntrySpecificNameReplacements =
      (staticEntry, heroEntry, nameAddition) => {
    let name = Accessors.name(staticEntry);

    let mapNameAddition = f => maybe(name, f, nameAddition);

    let mapDefaultWithParens = () =>
      mapNameAddition(add => name ++ " (" ++ add ++ ")");
    let mapDefaultWithoutParens = () =>
      mapNameAddition(add => name ++ " " ++ add);

    let addSndInParens = snd =>
      ListH.Extra.replaceStr(")", ": " ++ snd ++ ")");

    switch (staticEntry) {
    | Advantage(entry) =>
      switch (Ids.AdvantageId.fromInt(entry.id)) {
      | ImmunityToPoison
      | ImmunityToDisease
      | HatredFor => mapDefaultWithoutParens()
      | _ => mapDefaultWithParens()
      }
    | Disadvantage(entry) =>
      switch (Ids.DisadvantageId.fromInt(entry.id)) {
      | AfraidOf => mapDefaultWithoutParens()
      | Principles
      | Obligations =>
        nameAddition
        |> liftM2(
             (level, nameAddition) =>
               name ++ " " ++ level ++ " (" ++ nameAddition ++ ")",
             heroEntry.level >>= Integers.intToRoman,
           )
        |> fromMaybe(name)
      | _ => mapDefaultWithParens()
      }
    | SpecialAbility(entry) =>
      switch (Ids.SpecialAbilityId.fromInt(entry.id)) {
      | GebieterDesAspekts => mapDefaultWithoutParens()
      | TraditionArcaneBard
      | TraditionArcaneDancer
      | TraditionSavant => mapNameAddition(flip(addSndInParens, name))
      | _ => mapDefaultWithParens()
      }
    };
  };

  type combinedName = {
    name: string,
    baseName: string,
    addName: maybe(string),
    levelName: maybe(string),
  };

  /**
   * Returns name, splitted and combined, of advantage/disadvantage/special
   * ability as a Maybe (in case the wiki entry does not exist).
   */
  let getName = (staticData, staticEntry, heroEntry) => {
    let addName =
      getEntrySpecificNameAddition(staticData, staticEntry, heroEntry);
    let fullName =
      getEntrySpecificNameReplacements(staticEntry, heroEntry, addName);

    {
      name: fullName,
      baseName: Accessors.name(staticEntry),
      addName,
      levelName: Nothing,
    };
  };
  /*
   /**
    * `compressList :: L10n -> [ActiveActivatable] -> String`
    *
    * Takes a list of active Activatables and merges them together. Used to display
    * lists of Activatables on character sheet.
    */
   export const compressList =
     (staticData: StaticDataRecord) =>
     (xs: List<Record<ActiveActivatable>>): string => {
       const grouped_xs =
         elems (groupByKey<Record<ActiveActivatable>, string> (AAA_.id) (xs))

       return pipe (
                     map (
                       ifElse<List<Record<ActiveActivatable>>>
                         (xs_group => flength (xs_group) === 1)
                         (pipe (listToMaybe, maybe ("") (AAA_.name)))
                         (xs_group => pipe (
                                             map ((x: Record<ActiveActivatable>) => {
                                               const levelPart =
                                                 pipe (
                                                       AAA_.level,
                                                       fmap (pipe (toRoman, appendStr (" "))),
                                                       fromMaybe ("")
                                                     )
                                                     (x)

                                               const selectOptionPart =
                                                 fromMaybe ("") (AAA_.addName (x))

                                               return selectOptionPart + levelPart
                                             }),
                                             sortStrings (staticData),
                                             intercalate (", "),
                                             x => ` (${x})`,
                                             x => maybe ("")
                                                       ((r: Record<ActiveActivatable>) =>
                                                         AAA_.baseName (r) + x)
                                                       (listToMaybe (xs_group))
                                           )
                                           (xs_group))
                     ),
                     sortStrings (staticData),
                     intercalate (", ")
                   )
                   (grouped_xs)
     }
   */
};

module AdventurePoints = {
  open Maybe;
  open Maybe.Functor;
  open Maybe.Monad;
  open Static;
  open Function;

  /**
   * Returns the value(s) how the spent AP value would change after removing the
   * respective entry.
   *
   * @param isEntryToAdd If `entry` has not been added to the list of active
   * entries yet, this must be `true`, otherwise `false`.
   */
  let getEntrySpecificCost =
      (
        isEntryToAdd,
        staticData,
        hero,
        staticEntry,
        heroEntry,
        singleHeroEntry,
      ) => {
    open ListH;

    let sid1 = singleHeroEntry |> getOption1;
    let level = singleHeroEntry.level;
    let apValue =
      staticEntry |> Accessors.apValue |> fromMaybe(Static.Advantage.Flat(0));

    switch (staticEntry) {
    | Advantage(entry) =>
      switch (Ids.AdvantageId.fromInt(entry.id)) {
      | Aptitude
      | ExceptionalSkill =>
        heroEntry
        |> getOption1
        >>= (
          sid =>
            switch (sid, apValue) {
            | (`Skill(id), PerLevel(apValues)) =>
              IntMap.lookup(id, staticData.skills)
              >>= (static => apValues <!!> IC.icToIx(static.ic))
            | (`Spell(id), PerLevel(apValues)) =>
              IntMap.lookup(id, staticData.spells)
              >>= (static => apValues <!!> IC.icToIx(static.ic))
            | (`LiturgicalChant(id), PerLevel(apValues)) =>
              IntMap.lookup(id, staticData.liturgicalChants)
              >>= (static => apValues <!!> IC.icToIx(static.ic))
            | _ => Nothing
            }
        )
      | ExceptionalCombatTechnique
      | WeaponAptitude =>
        heroEntry
        |> getOption1
        >>= (
          sid =>
            switch (sid, apValue) {
            | (`CombatTechnique(id), PerLevel(apValues)) =>
              IntMap.lookup(id, staticData.combatTechniques)
              >>= (static => apValues <!!> IC.icToIx(static.ic))
            | _ => Nothing
            }
        )
      | _ => Nothing
      }
    | Disadvantage(entry) =>
      switch (Ids.DisadvantageId.fromInt(entry.id)) {
      | Incompetent =>
        heroEntry
        |> getOption1
        >>= (
          sid =>
            switch (sid, apValue) {
            | (`Skill(id), PerLevel(apValues)) =>
              IntMap.lookup(id, staticData.skills)
              >>= (static => apValues <!!> IC.icToIx(static.ic))
            | _ => Nothing
            }
        )
      | _ => Nothing
      }
    | SpecialAbility(entry) =>
      switch (Ids.SpecialAbilityId.fromInt(entry.id)) {
      | AdaptionZauber
      | _ => Nothing
      }
    };
  };
  //     const current_id = AOWIA.id (entry)
  //     const mcurrent_sid = AOWIA.sid (entry)
  //     const mcurrent_level = AOWIA.tier (entry)
  //     const mcurrent_cost = AAL.cost (wiki_entry)
  //     const all_active = joinMaybeList (fmap (ActivatableDependent.A.active) (hero_entry))
  //     switch (current_id) {
  //       // Entry with Skill selection
  //       case AdvantageId.Aptitude:
  //       case AdvantageId.ExceptionalSkill:
  //       case AdvantageId.ExceptionalCombatTechnique:
  //       case AdvantageId.WeaponAptitude:
  //       case DisadvantageId.Incompetent:
  //       case SpecialAbilityId.AdaptionZauber:
  //       case SpecialAbilityId.FavoriteSpellwork:
  //       case SpecialAbilityId.Forschungsgebiet:
  //       case SpecialAbilityId.Expertenwissen:
  //       case SpecialAbilityId.Wissensdurst:
  //       case SpecialAbilityId.Lieblingsliturgie:
  //       case SpecialAbilityId.WegDerGelehrten:
  //       case SpecialAbilityId.WegDerKuenstlerin:
  //       case SpecialAbilityId.Fachwissen:
  //       case SpecialAbilityId.Handwerkskunst:
  //       case SpecialAbilityId.KindDerNatur:
  //       case SpecialAbilityId.KoerperlichesGeschick:
  //       case SpecialAbilityId.SozialeKompetenz:
  //       case SpecialAbilityId.Universalgenie: {
  //         return getCostForEntryWithSkillSel (misStringM)
  //                                           (wiki)
  //                                           (mcurrent_sid)
  //                                           (mcurrent_cost)
  //       }
  //       case DisadvantageId.PersonalityFlaw: {
  //         if (
  //           // 7 = "Prejudice" => more than one entry possible
  //           // more than one entry of Prejudice does not contribute to AP spent
  //           isPersonalityFlawNotPaid (7) (1) (isEntryToAdd) (all_active) (mcurrent_sid)
  //           // 8 = "Unworldly" => more than one entry possible
  //           // more than two entries of Unworldly do not contribute to AP spent
  //           || isPersonalityFlawNotPaid (8) (2) (isEntryToAdd) (all_active) (mcurrent_sid)
  //         ) {
  //           return Just (0)
  //         }
  //         return getSelectOptionCost (wiki_entry) (mcurrent_sid)
  //       }
  //       case DisadvantageId.Principles:
  //       case DisadvantageId.Obligations: {
  //         const current_max_level = foldl (compareMaxLevel)
  //                                         (0)
  //                                         (all_active)
  //         const current_second_max_level = foldl (compareSubMaxLevel (current_max_level))
  //                                               (0)
  //                                               (all_active)
  //         if (isNothing (mcurrent_level)) {
  //           return Nothing
  //         }
  //         const current_level = fromJust (mcurrent_level)
  //         if (
  //           // If the entry is not the one with the highest level, adding or
  //           // removing it won't affect AP spent at all
  //           current_max_level > current_level
  //           // If there is more than one entry on the same level if this entry is
  //           // active, it won't affect AP spent at all. Thus, if the entry is to
  //           // be added, there must be at least one (> 0) entry for this rule to
  //           // take effect.
  //           || countWith (pipe (ActiveObject.AL.tier, elem (current_level)))
  //                       (all_active) > (isEntryToAdd ? 0 : 1)
  //         ) {
  //           return Nothing
  //         }
  //         // Otherwise, the level difference results in the cost.
  //         return fmapF (misNumberM (mcurrent_cost))
  //                     (multiply (current_level - current_second_max_level))
  //       }
  //       case DisadvantageId.BadHabit: {
  //         // more than three entries cannot contribute to AP spent; entries with
  //         // custom cost are ignored for the rule's effect
  //         if (countWith (pipe (ActiveObject.AL.cost, isNothing))
  //                       (all_active) > (isEntryToAdd ? 2 : 3)) {
  //           return Nothing
  //         }
  //         return mcurrent_cost
  //       }
  //       case SpecialAbilityId.SkillSpecialization: {
  //         return pipe_ (
  //           mcurrent_sid,
  //           misStringM,
  //           bindF (
  //             current_sid =>
  //               fmapF (lookup (current_sid)
  //                             (StaticData.A.skills (wiki)))
  //                     (skill =>
  //                       // Multiply number of final occurences of the
  //                       // same skill...
  //                       (countWith ((e: Record<ActiveObject>) =>
  //                                   pipe (
  //                                         ActiveObject.AL.sid,
  //                                         elem<string | number> (current_sid)
  //                                       )
  //                                       (e)
  //                                   // Entries with custom cost are ignored for the rule
  //                                   && isNothing (ActiveObject.AL.cost (e)))
  //                                 (all_active) + (isEntryToAdd ? 1 : 0))
  //                       // ...with the skill's IC
  //                       * Skill.AL.ic (skill))
  //           )
  //         )
  //       }
  //       case SpecialAbilityId.Language: {
  //         // Native Tongue (level 4) does not cost anything
  //         return elem (4) (mcurrent_level) ? Nothing : mcurrent_cost
  //       }
  //       case SpecialAbilityId.PropertyKnowledge:
  //       case SpecialAbilityId.AspectKnowledge: {
  //         // Does not include custom cost activations in terms of calculated cost
  //         const amount = countWith (pipe (ActiveObject.AL.cost, isNothing))
  //                                 (all_active)
  //         const index = amount + (isEntryToAdd ? 0 : -1)
  //         if (isNothing (mcurrent_cost)) {
  //           return Nothing
  //         }
  //         const current_cost = fromJust (mcurrent_cost)
  //         return isList (current_cost) ? subscript (current_cost) (index) : Nothing
  //       }
  //       case SpecialAbilityId.TraditionWitches: {
  //         // There are two disadvantages that, when active, decrease the cost of
  //         // this tradition by 10 AP each
  //         const decreaseCost = (id: string) => (cost: number) =>
  //           isDisadvantageActive (id) (hero) ? cost - 10 : cost
  //         return pipe_ (
  //           mcurrent_cost,
  //           misNumberM,
  //           fmap (pipe (
  //             decreaseCost (DisadvantageId.NoFlyingBalm),
  //             decreaseCost (DisadvantageId.NoFamiliar)
  //           ))
  //         )
  //       }
  //       case SpecialAbilityId.Recherchegespuer: {
  //         // The AP cost for this SA consist of two parts: AP based on the IC of
  //         // the main subject (from "SA_531"/Wissensdurst) in addition to AP based
  //         // on the IC of the side subject selected in this SA.
  //         const mhero_entry_SA_531 = lookup<string> (SpecialAbilityId.Wissensdurst)
  //                                                   (HA.specialAbilities (hero))
  //         if (isNothing (mhero_entry_SA_531)) {
  //           return Nothing
  //         }
  //         if (isNothing (mcurrent_cost) || isNothing (mcurrent_cost)) {
  //           return Nothing
  //         }
  //         const current_cost = fromJust (mcurrent_cost)
  //         if (isNumber (current_cost)) {
  //           return Nothing
  //         }
  //         const hero_entry_SA_531 = fromJust (mhero_entry_SA_531)
  //         const getCostFromHeroEntry =
  //           pipe (
  //             ActiveObject.AL.sid,
  //             misStringM,
  //             bindF (lookupF (StaticData.A.skills (wiki))),
  //             bindF (pipe (Skill.A.ic, dec, subscript (current_cost)))
  //           )
  //         return liftM2 (add)
  //                       (getCostFromHeroEntry (entry))
  //                       (pipe_ (
  //                         hero_entry_SA_531,
  //                         ActivatableDependent.A.active,
  //                         listToMaybe,
  //                         bindF (getCostFromHeroEntry)
  //                       ))
  //       }
  //       case SpecialAbilityId.LanguageSpecializations: {
  //         if (isNothing (mcurrent_sid)) {
  //           return Nothing
  //         }
  //         const current_sid = fromJust (mcurrent_sid)
  //         return pipe (
  //                       HA.specialAbilities,
  //                       lookup<string> (SpecialAbilityId.Language),
  //                       bindF (pipe (
  //                         ActivatableDependent.A.active,
  //                         // Get the `ActiveObject` for the corresponding language
  //                         find (pipe (ActiveObject.A.sid, elem (current_sid)))
  //                       )),
  //                       bindF (ActiveObject.A.tier),
  //                       // If it's a native language, it costs nothing, otherwise
  //                       // the default SA's AP
  //                       bindF (level => level === 4 ? Nothing : misNumberM (mcurrent_cost))
  //                     )
  //                     (hero)
  //       }
  //       default: {
  //         if (any (notNull) (Advantage.AL.select (wiki_entry)) && isNothing (mcurrent_cost)) {
  //           return getSelectOptionCost (wiki_entry) (mcurrent_sid)
  //         }
  //         return mcurrent_cost
  //       }
  //     }
  //   }
  // /**
  //  * Returns the AP value and if the entry is an automatic entry
  //  */
  // const getTotalCost =
  //   (isEntryToAdd: boolean) =>
  //   (automatic_advantages: List<string>) =>
  //   (wiki: StaticDataRecord) =>
  //   (hero: HeroModelRecord) =>
  //   (entry: Record<ActiveObjectWithId>) =>
  //   (hero_entry: Maybe<Record<ActivatableDependent>>) =>
  //   (wiki_entry: Activatable): Pair<number | List<number>, boolean> => {
  //     const custom_cost = AOWIA.cost (entry)
  //     const is_automatic = List.elem (AAL.id (wiki_entry)) (automatic_advantages)
  //     if (isJust (custom_cost)) {
  //       const is_disadvantage = Disadvantage.is (wiki_entry)
  //       return Pair (is_disadvantage ? -fromJust (custom_cost) : fromJust (custom_cost), is_automatic)
  //     }
  //     const mentry_specifc_cost = getEntrySpecificCost (isEntryToAdd)
  //                                                     (wiki)
  //                                                     (hero)
  //                                                     (wiki_entry)
  //                                                     (hero_entry)
  //                                                     (entry)
  //     const current_cost = fromMaybe<number | List<number>> (0) (mentry_specifc_cost)
  //     if (isDisadvantage (wiki_entry)) {
  //       return Pair (
  //         isList (current_cost) ? map (negate) (current_cost) : -current_cost,
  //         is_automatic
  //       )
  //     }
  //     return Pair (current_cost, is_automatic)
  //   }
  // /**
  //  * Returns the AP you get when removing the ActiveObject.
  //  *
  //  * @param isEntryToAdd If `entry` has not been added to the list of active
  //  * entries yet, this must be `true`, otherwise `false`.
  //  */
  // export const getCost =
  //   (isEntryToAdd: boolean) =>
  //   (automatic_advantages: List<string>) =>
  //   (wiki: StaticDataRecord) =>
  //   (hero: HeroModelRecord) =>
  //   (entry: Record<ActiveObjectWithId>): Maybe<Pair<number | List<number>, boolean>> => {
  //     const current_id = AOWIA.id (entry)
  //     return pipe_ (
  //       getWikiEntry (wiki) (current_id),
  //       bindF (ensure (isActivatableWikiEntry)),
  //       fmap (getTotalCost (isEntryToAdd)
  //                         (automatic_advantages)
  //                         (wiki)
  //                         (hero)
  //                         (entry)
  //                         (bind (getHeroStateItem (hero) (current_id))
  //                               (ensure (isActivatableDependent))))
  //     )
  //   }
};