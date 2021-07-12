import React, { useState, ChangeEvent } from 'react';
import { Api } from './api';
import { Box, Grid, Typography, InputLabel, TextField, Button, CircularProgress } from '@material-ui/core';

function Home() {
  const [changed, setChanged] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const showError = !name && changed;

  const api = new Api();

  const predictAgeByName = async (name: string) => {
    try {
      setLoading(true);
      const { data, status } = await api.predictAge(name);
      setAge(data.age);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

   return (
    <Box p={4}>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Hello, I am a Micro-Frontend app!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" alignContent="center" spacing={1} justifyContent="center">
            <Grid item xs={8}>
              <Box mb={1}>
                <InputLabel>Type your name, and we will predict our age!</InputLabel>
              </Box>
              <TextField
                fullWidth
                id="name"
                label={showError ? "Field cannot be empty" : "Name"}
                variant="outlined"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                  setChanged(true);
                }}
                error={showError}
              />
            </Grid>
            <Grid item xs={4}>
              <Box mt={2.5}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={!changed || showError}
                  onClick={async () => {
                    await predictAgeByName(name);
                  }}
                >
                  Predict Age
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {loading && <Box m={1}><CircularProgress /></Box>}
        {age ? (<Grid item xs={12}>
          <Typography variant="body1" component="div">
            Your predicted age is: {age}
          </Typography>
        </Grid>) : ''}
      </Grid>
    </Box>
  );
}

export default Home;
