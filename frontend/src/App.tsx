import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia, CardActions, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Star as StarIcon, Add as AddIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

type Project = {
  id: bigint;
  title: string;
  category: string;
  description: string | null;
  imageUrl: string | null;
  author: string;
  stars: bigint;
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  const fetchProjects = async () => {
    const fetchedProjects = await backend.getProjects(selectedCategory);
    setProjects(fetchedProjects);
  };

  const handleStarProject = async (id: bigint) => {
    await backend.starProject(id);
    fetchProjects();
  };

  const handleAddProject = async (data: any) => {
    await backend.addProject(
      data.title,
      data.category,
      data.description,
      data.imageUrl,
      data.author
    );
    setOpenDialog(false);
    reset();
    fetchProjects();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GEM's Showcase
          </Typography>
          <Button color="inherit" onClick={() => setOpenDialog(true)}>
            <AddIcon /> Add Project
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item key={Number(project.id)} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.imageUrl || `https://fakeimg.pl/400x200?text=${project.title}`}
                  alt={project.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {project.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {project.author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleStarProject(project.id)}>
                    <StarIcon />
                  </IconButton>
                  <Typography variant="body2">{Number(project.stars)}</Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleAddProject)}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} label="Title" fullWidth margin="normal" />}
            />
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} label="Category" fullWidth margin="normal" />}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Description" fullWidth margin="normal" multiline rows={4} />}
            />
            <Controller
              name="imageUrl"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Image URL" fullWidth margin="normal" />}
            />
            <Controller
              name="author"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} label="Author" fullWidth margin="normal" />}
            />
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Add Project</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default App;
