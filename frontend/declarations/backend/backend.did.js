export const idlFactory = ({ IDL }) => {
  const Project = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'author' : IDL.Text,
    'stars' : IDL.Nat,
    'imageUrl' : IDL.Opt(IDL.Text),
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addProject' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getProjects' : IDL.Func(
        [IDL.Opt(IDL.Text)],
        [IDL.Vec(Project)],
        ['query'],
      ),
    'starProject' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
