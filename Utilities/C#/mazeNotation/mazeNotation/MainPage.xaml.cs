using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Media.Casting;
using Windows.Media.Devices;
using Windows.UI;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace mazeNotation
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private int normal = 20;
        private int small = 10;
        public MainPage()
        {
            this.InitializeComponent();
            DataContext = this;
            Loaded += MainPage_Loaded;
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void MainPage_Loaded(object sender, RoutedEventArgs e)
        {
            PopulatePage();
        }

        private void GenerateButton_Click(object sender, RoutedEventArgs e)
        {
            PopulatePage();
        }

        private void ChangeColor(object sender, RoutedEventArgs e)
        {
        }

        //create separate file to abstract this, include proper parameters
        private void PopulatePage()
        {
            //grid needs to be in uwp and we change it as we go
            Grid grid = new Grid();
            int cols = Int32.Parse(numCols.Text) * 2 + 1;
            int rows = Int32.Parse(numRows.Text) * 2 + 1;
            int max = Math.Max(cols, rows);
            

            grid.HorizontalAlignment = HorizontalAlignment.Stretch;
            grid.VerticalAlignment = VerticalAlignment.Stretch;
            
            for (int i = 0; i < max; i++)
            {
                ColumnDefinition cd = new ColumnDefinition();
                cd.Width = GridLength.Auto;
                RowDefinition rd = new RowDefinition();
                rd.Height = GridLength.Auto;
                grid.ColumnDefinitions.Add(cd);
                grid.RowDefinitions.Add(rd);
            }

            for (int i = 0; i < rows; i++)
            {
                if (i >= rows) break;
                for (int j = 0; j < cols; j++)
                {
                    if (i >= cols) break;

                    ToggleButton bt = new ToggleButton();
                    if (i % 2 == 0 ||  j % 2 == 0) {
                        bt.IsChecked = true;
                    }

                    if(i % 2 == 0 && j % 2 == 0)
                    {
                        bt.Height = small;
                        bt.Width = small;
                    }
                    //collumn wall
                    else if(j % 2 == 0)
                    {
                        bt.Height = normal;
                        bt.Width = small;
                    }
                    //row wall
                    else if(i % 2 == 0)
                    {
                        bt.Height = small;
                        bt.Width = normal;
                    }
                    //normal
                    else
                    {
                        bt.Height = normal;
                        bt.Width = normal;
                    }

                    Grid.SetColumn(bt, j);
                    Grid.SetRow(bt, i);

                    grid.Children.Add(bt);
                    grid.ColumnSpacing = 0;
                    grid.RowSpacing = 0;
                }
            }

            gridBorder.Child = grid;
        }

        private void CreateText_Click(object sender, RoutedEventArgs e)
        {
            string output = "";
            Grid grid = gridBorder.Child as Grid;
            if (grid != null)
            {
                foreach(ToggleButton child in grid.Children)
                {
                    if (child.Height == small && child.Width == small)
                    {
                        output += ".";
                    }
                    else if (child.Height == small && (bool)child.IsChecked)
                    {
                        output += "_";
                    }
                    else if (child.Width == small && (bool)child.IsChecked)
                    {
                        output += "|";
                    }
                    else if((bool)child.IsChecked)
                    {
                        output += "0";
                    }
                    else
                    {
                        output += "o";
                    }
                }

                outputText.Text = output;
            }
        }
    }
}
