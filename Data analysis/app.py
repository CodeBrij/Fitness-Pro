# app.py
import streamlit as st
import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt
import random
from datetime import datetime, timedelta

st.set_page_config(layout='wide', page_title='Warehouse Management')

# Sample data generation
def generate_sample_data():
    transactions_data = {
        'Transaction_ID': range(1, 101),
        'Product_ID': [random.randint(1, 20) for _ in range(100)],
        'Transaction_Type': ['Inflow' if random.random() < 0.5 else 'Outflow' for _ in range(100)],
        'Quantity': [random.randint(1, 10) for _ in range(100)],
        'Transaction_Date': [datetime.now() - timedelta(days=random.randint(1, 30)) for _ in range(100)]
    }

    products_data = {
        'Product_ID': range(1, 21),
        'Product_Name': [f'Product_{i}' for i in range(1, 21)],
        'Category': ['Electronics', 'Clothing', 'Electronics', 'Clothing', 'Electronics',
                     'Clothing', 'Electronics', 'Clothing', 'Electronics', 'Clothing',
                     'Electronics', 'Clothing', 'Electronics', 'Clothing', 'Electronics',
                     'Clothing', 'Electronics', 'Clothing', 'Electronics', 'Clothing'],
        'Unit_Price': [random.uniform(10, 100) for _ in range(20)]
    }

    stock_data = {
        'Product_ID': range(1, 21),
        'Current_Stock': [random.randint(10, 50) for _ in range(20)]
    }

    transactions_df = pd.DataFrame(transactions_data)
    products_df = pd.DataFrame(products_data)
    stock_df = pd.DataFrame(stock_data)

    return transactions_df, products_df, stock_df


transactions_df, products_df, stock_df = generate_sample_data()


st.sidebar.title('Warehouse Management Dashboard')

option = st.sidebar.selectbox('Select One', ['Overall Analysis', 'Product', 'Transaction'])

if option == 'Overall Analysis':
    st.title('Overall Analysis')

    total_stock = stock_df['Current_Stock'].sum()

    avg_price = products_df['Unit_Price'].mean()

    num_products = products_df['Product_ID'].nunique()

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric('Total Stock', str(total_stock))
    with col2:
        st.metric('Average Price', f'${avg_price:.2f}')
    with col3:
        st.metric('Products Available', str(num_products))
    with col4:
        st.metric('Total Transactions', str(len(transactions_df)))

    st.header('Month on Month Stock Levels')
    month_series = transactions_df.groupby(transactions_df['Transaction_Date'].dt.to_period("M"))['Quantity'].sum()
    fig3, ax3 = plt.subplots()
    ax3.plot(month_series.index.astype(str), month_series.values)
    st.pyplot(fig3)



elif option == 'Product':
    selected_product = st.sidebar.selectbox('Select Product', sorted(products_df['Product_Name'].unique()))
    btn1 = st.sidebar.button('View Product Details')
    st.title('Product Details')

    if btn1:
        st.subheader(f'Details for {selected_product}')

        product_info = products_df[products_df['Product_Name'] == selected_product].head(1)[['Product_ID', 'Category', 'Unit_Price']]
        st.dataframe(product_info)

        st.subheader('Transaction History')
        product_transactions = transactions_df[transactions_df['Product_ID'] == product_info['Product_ID'].values[0]]
        st.dataframe(product_transactions)

        st.subheader('Stock History')
        product_stock_history = stock_df[stock_df['Product_ID'] == product_info['Product_ID'].values[0]]
        st.dataframe(product_stock_history)

        st.subheader('Quantity in Each Transaction Over Time')
        transaction_quantity_over_time = product_transactions.groupby('Transaction_Date')['Quantity'].sum()
        fig_product_transactions, ax_product_transactions = plt.subplots()
        ax_product_transactions.bar(transaction_quantity_over_time.index, transaction_quantity_over_time.values, color='skyblue')
        plt.xticks(rotation=45)
        st.pyplot(fig_product_transactions)




elif option == 'Transaction':
    st.title('Transaction Analysis')

    st.subheader('Recent Transactions')
    st.dataframe(transactions_df.head())

    st.subheader('Transaction Types')
    transaction_types = transactions_df['Transaction_Type'].value_counts()
    fig1, ax1 = plt.subplots()
    ax1.pie(transaction_types, labels=transaction_types.index, autopct="%0.01f%%")
    st.pyplot(fig1)

    st.subheader('Stock Value Over Time')
    stock_over_time = stock_df.groupby(stock_df.index)['Current_Stock'].sum()
    fig2, ax2 = plt.subplots()
    ax2.plot(stock_over_time.index, stock_over_time.values)
    st.pyplot(fig2)
