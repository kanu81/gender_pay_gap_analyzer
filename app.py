# app.py

from flask import Flask, render_template
import pandas as pd
from scipy.stats import ttest_ind
import seaborn as sns
import matplotlib.pyplot as plt

app = Flask(__name__)

# Step 1: Read the data from the CSV file
df = pd.read_csv('data.csv')

# Step 2: Calculate the gender pay gap
gender_pay_gap = df.groupby(['JobTitle', 'Gender'])[
    'BasePay'].mean().unstack().reset_index()
gender_pay_gap['PayGap'] = gender_pay_gap['Male'] - gender_pay_gap['Female']

# Step 3: Sort the data based on gender pay gap
sorted_gender_pay_gap = gender_pay_gap.sort_values(
    by='PayGap', ascending=False)

# Step 4: Create a comparison statistical model
job_titles = sorted_gender_pay_gap['JobTitle'].tolist()

for i in range(len(job_titles)):
    for j in range(i + 1, len(job_titles)):
        title1 = job_titles[i]
        title2 = job_titles[j]

        male_pay_title1 = df[(df['JobTitle'] == title1) &
                             (df['Gender'] == 'Male')]['BasePay']
        female_pay_title1 = df[(df['JobTitle'] == title1) & (
            df['Gender'] == 'Female')]['BasePay']

        male_pay_title2 = df[(df['JobTitle'] == title2) &
                             (df['Gender'] == 'Male')]['BasePay']
        female_pay_title2 = df[(df['JobTitle'] == title2) & (
            df['Gender'] == 'Female')]['BasePay']

        t_stat, p_value = ttest_ind(
            male_pay_title1, female_pay_title1, equal_var=False)

        print(f"Comparison between {title1} (Male) and {title2} (Female):")
        print(f"t-statistic: {t_stat}, p-value: {p_value}")
        if p_value < 0.05:
            print("The difference is statistically significant.\n")
        else:
            print("The difference is not statistically significant.\n")

# Step 5: Generate the plot and save it as an image
plt.figure(figsize=(12, 6))
sns.barplot(x='JobTitle', y='PayGap',
            data=sorted_gender_pay_gap, palette='muted')
plt.xticks(rotation=45, ha='right')
plt.xlabel('Job Title')
plt.ylabel('Gender Pay Gap')
plt.title('Gender Pay Gap by Job Title')
plt.tight_layout()

# Save the plot as an image file
plot_file = 'templates/plot.png'
plt.savefig(plot_file)
plt.close()


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
