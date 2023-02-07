const getJobs = async (req, res) => {
  res.send("Jobs")
}

const getJob = async (req, res) => {
  res.send("Job")
}

const createJob = async (req, res) => {
  res.send("new Job")
}

const updateJob = async (req, res) => {
  res.send("updated Job")
}

const deleteJob = async (req, res) => {
  res.send("deleted")
}

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob }
