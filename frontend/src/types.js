// @flow

export type Store = {
  stuff: Stuff,
  colors: Colors
}

/**
 *  Stuff
 */
export type Stuff = Array<string>
export type StuffAction = {
  type: string,
  payload: Stuff
}
export type StuffStateProps = {
  stuff: Stuff
}
export type StuffDispatchProps = {
  fetchStuff(): Promise<Stuff>
}
export type StuffListProps = StuffStateProps & StuffDispatchProps

/**
 *  Colors
 */
export type Colors = Array<string>
export type ColorsAction = {
  type: string,
  payload: Colors
}
export type ColorsProps = {
  colors: Colors
}
