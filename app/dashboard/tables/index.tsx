import { createFileRoute } from "@tanstack/react-router"

import React from 'react';
import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
  Search,
  SlidersHorizontal,
  Trash2,
  Users
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";


export const Route = createFileRoute('/dashboard/tables/')({
  component: TablesPage,
})

// Generate mock data
const generateMockData = (count: number) => {
  const statuses = ["active", "inactive", "pending"];
  const roles = ["User", "Admin", "Editor", "Viewer"];
  const names = [
    "Alice Johnson", "Bob Smith", "Charlie Brown", "David Wilson",
    "Emma Davis", "Frank Miller", "Grace Taylor", "Henry Anderson",
    "Ivy Martinez", "Jack Thompson", "Kelly White", "Liam Harris",
    "Mia Clark", "Noah Lewis", "Olivia Moore", "Peter Hall",
    "Quinn Adams", "Rachel Turner", "Samuel Baker", "Tara Collins"
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `USR${(i + 1).toString().padStart(5, '0')}`,
    name: names[i % names.length],
    email: names[i % names.length].toLowerCase().replace(' ', '.') + '@example.com',
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    joined: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
  }));
};

const ITEMS_PER_PAGE = 10;
const mockData = generateMockData(100);

function TablesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'name', direction: 'asc' });

  // Filter data
  const filteredData = mockData.filter(item => {
    const matchesSearch = (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesRole = roleFilter === "all" || item.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === 'lastActive' || sortConfig.key === 'joined') {
      const dateA = new Date(a[sortConfig.key]).getTime();
      const dateB = new Date(b[sortConfig.key]).getTime();
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    const valueA = a[sortConfig.key as keyof typeof a];
    const valueB = b[sortConfig.key as keyof typeof b];
    
    if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedData.map(item => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
      case 'inactive':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400';
      case 'pending':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-muted-foreground">
            Manage and monitor user accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="h-8">
            <Users className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={roleFilter}
                  onValueChange={setRoleFilter}
                >
                  <SelectTrigger className="w-[130px]">
                    <Users className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectedItems.length === paginatedData.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      ID
                      {sortConfig.key === 'id' && (
                        <ChevronDown className={`ml-1 h-4 w-4 inline-block transition-transform ${
                          sortConfig.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Name
                      {sortConfig.key === 'name' && (
                        <ChevronDown className={`ml-1 h-4 w-4 inline-block transition-transform ${
                          sortConfig.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                      )}
                    </TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('lastActive')}
                    >
                      Last Active
                      {sortConfig.key === 'lastActive' && (
                        <ChevronDown className={`ml-1 h-4 w-4 inline-block transition-transform ${
                          sortConfig.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('joined')}
                    >
                      Joined
                      {sortConfig.key === 'joined' && (
                        <ChevronDown className={`ml-1 h-4 w-4 inline-block transition-transform ${
                          sortConfig.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                      )}
                    </TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(user.id)}
                          onCheckedChange={() => handleSelectItem(user.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(user.status)}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastActive.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {user.joined.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <SlidersHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(current => Math.max(1, current - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      const distance = Math.abs(page - currentPage);
                      return distance === 0 || distance === 1 || page === 1 || page === totalPages;
                    })
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(current => Math.min(totalPages, current + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}