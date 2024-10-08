import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";

actor {
  type Project = {
    id: Nat;
    title: Text;
    category: Text;
    description: ?Text;
    imageUrl: ?Text;
    author: Text;
    stars: Nat;
  };

  stable var nextId: Nat = 0;
  let projects = HashMap.HashMap<Nat, Project>(10, Nat.equal, Nat.hash);

  public func addProject(title: Text, category: Text, description: ?Text, imageUrl: ?Text, author: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let project: Project = {
      id;
      title;
      category;
      description;
      imageUrl;
      author;
      stars = 0;
    };
    projects.put(id, project);
    Debug.print("Added project: " # debug_show(project));
    id
  };

  public query func getProjects(category: ?Text) : async [Project] {
    let filteredProjects = switch (category) {
      case (null) { projects.vals() };
      case (?cat) { Iter.filter(projects.vals(), func (p: Project) : Bool { p.category == cat }) };
    };
    let result = Iter.toArray(filteredProjects);
    Debug.print("Fetched projects: " # debug_show(result));
    result
  };

  public func starProject(id: Nat) : async Bool {
    switch (projects.get(id)) {
      case (null) {
        Debug.print("Project not found: " # Nat.toText(id));
        false
      };
      case (?project) {
        let updatedProject = {
          id = project.id;
          title = project.title;
          category = project.category;
          description = project.description;
          imageUrl = project.imageUrl;
          author = project.author;
          stars = project.stars + 1;
        };
        projects.put(id, updatedProject);
        Debug.print("Starred project: " # debug_show(updatedProject));
        true
      };
    }
  };
}
