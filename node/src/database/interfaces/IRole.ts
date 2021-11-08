interface IRoleWhere {
  id?: string;
  description?: string;
}

interface IRoleData {
  description: string;
}

interface IRoleRead {
  description: string;
}

export { IRoleWhere, IRoleData, IRoleRead };
