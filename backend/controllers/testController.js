exports.getActivities = async (req, res) => {
  try {
    activity = [
      {
        id: 1,
        store_id: 1,
        date:  '2024-11-24',
        start_time: '11:00',
        end_time: '12:00',
        tags: 'test1',
        review: 3,
        indicator: 1
      },
      {
        id: 2,
        store_id: 2,
        date:  '2024-11-23',
        start_time: '10:00',
        end_time: '14:00',
        tags: 'test2',
        review: 1,
        indicator: 1
      },
    ]
    res.status(200).json(activity)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get activity' })
    console.error(err)
  }
}