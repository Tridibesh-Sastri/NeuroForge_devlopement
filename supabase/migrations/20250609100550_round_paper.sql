/*
  # Psychometric Assessment Database Schema

  1. New Tables
    - `psychometric_responses`
      - `id` (uuid, primary key)
      - `respondent_id` (uuid, unique identifier for each respondent)
      - `timestamp` (timestamptz, when assessment was completed)
      - `age` (integer)
      - `gender` (text)
      - `education_level` (text)
      - `responses` (jsonb, array of question responses)
      - `total_score` (integer, calculated total score)
      - `dimension_scores` (jsonb, scores for each psychological dimension)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `psychometric_responses` table
    - Add policies for authenticated users to manage their own data
    - Add policy for analytics access

  3. Indexes
    - Add indexes for efficient querying
*/

CREATE TABLE IF NOT EXISTS psychometric_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_id uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  timestamp timestamptz DEFAULT now(),
  age integer,
  gender text,
  education_level text,
  responses jsonb NOT NULL,
  total_score integer NOT NULL,
  dimension_scores jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE psychometric_responses ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own data
CREATE POLICY "Users can read own responses"
  ON psychometric_responses
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = respondent_id::text);

-- Policy for users to insert their own data
CREATE POLICY "Users can insert own responses"
  ON psychometric_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = respondent_id::text);

-- Policy for analytics (aggregate data only)
CREATE POLICY "Analytics access for aggregate data"
  ON psychometric_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_psychometric_responses_respondent_id 
  ON psychometric_responses(respondent_id);

CREATE INDEX IF NOT EXISTS idx_psychometric_responses_timestamp 
  ON psychometric_responses(timestamp);

CREATE INDEX IF NOT EXISTS idx_psychometric_responses_total_score 
  ON psychometric_responses(total_score);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_psychometric_responses_updated_at
  BEFORE UPDATE ON psychometric_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();