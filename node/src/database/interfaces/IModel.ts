interface IModel<RRI, CUI, O, OM> {
  create(data: CUI): Promise<OM>;
  read(where: RRI, asResponse: boolean): Promise<O | OM>;
  update(where: RRI, data: CUI): Promise<OM>;
  remove(where: RRI): Promise<OM>;
}

export { IModel };
